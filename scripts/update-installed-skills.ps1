param(
  [string]$RepoRoot,
  [string]$CodexSkillsDir,
  [switch]$NoPull,
  [switch]$DryRun,
  [switch]$Force
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version 2.0

function Get-DirectoryFingerprint {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    return $null
  }

  $root = (Resolve-Path -LiteralPath $Path).Path
  $rows = Get-ChildItem -File -Force -Recurse -LiteralPath $root | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash.ToLowerInvariant()
    "$relative`t$hash"
  } | Sort-Object

  $payload = [string]::Join("`n", @($rows))
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    return ([System.BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant()
  } finally {
    $sha.Dispose()
  }
}

function Get-SavedFingerprints {
  param([Parameter(Mandatory = $true)][string]$StatePath)

  $result = @{}
  if (-not (Test-Path -LiteralPath $StatePath)) {
    return $result
  }

  $state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
  if ($null -ne $state.skills) {
    foreach ($property in $state.skills.PSObject.Properties) {
      $result[$property.Name] = [string]$property.Value
    }
  }
  return $result
}

if (-not $RepoRoot -or $RepoRoot.Trim() -eq "") {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $scriptDir "..")
}

if (-not $CodexSkillsDir -or $CodexSkillsDir.Trim() -eq "") {
  $CodexSkillsDir = Join-Path $env:USERPROFILE ".codex\skills"
}

$RepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
$sourceSkillsDir = Join-Path $RepoRoot "agentic-software-steward\skills"
$statePath = Join-Path $CodexSkillsDir ".agentic-software-steward-sync.json"

if (-not (Test-Path -LiteralPath $sourceSkillsDir)) {
  throw "Missing skill source directory: $sourceSkillsDir"
}

if (-not $NoPull) {
  Write-Host "Pulling latest changes for $RepoRoot ..."
  if ($DryRun) {
    Write-Host "[dry-run] git -C `"$RepoRoot`" pull --ff-only"
  } else {
    & git -C $RepoRoot pull --ff-only
    if ($LASTEXITCODE -ne 0) {
      throw "git pull --ff-only failed with exit code $LASTEXITCODE. Installed skills were not changed."
    }
  }
}

$skills = @(Get-ChildItem -Directory -LiteralPath $sourceSkillsDir | Where-Object {
  Test-Path -LiteralPath (Join-Path $_.FullName "SKILL.md")
} | Sort-Object Name)

if ($skills.Count -eq 0) {
  throw "No skills found under $sourceSkillsDir"
}

foreach ($skill in $skills) {
  $entrypoint = Join-Path $skill.FullName "SKILL.md"
  $content = Get-Content -Raw -LiteralPath $entrypoint
  $escapedName = [System.Text.RegularExpressions.Regex]::Escape($skill.Name)
  if ($content -notmatch "(?ms)^---\s*\r?\nname:\s*$escapedName\s*\r?\ndescription:\s*.+?\r?\n---") {
    throw "Invalid or mismatched SKILL.md frontmatter: $entrypoint"
  }
}

if (-not (Test-Path -LiteralPath $CodexSkillsDir)) {
  if ($DryRun) {
    Write-Host "[dry-run] create $CodexSkillsDir"
  } else {
    New-Item -ItemType Directory -Force -Path $CodexSkillsDir | Out-Null
  }
}

$saved = Get-SavedFingerprints -StatePath $statePath
$actions = @()
$conflicts = @()
$sourceNames = @{}

foreach ($skill in $skills) {
  $sourceNames[$skill.Name] = $true
  $dest = Join-Path $CodexSkillsDir $skill.Name
  $sourceFingerprint = Get-DirectoryFingerprint -Path $skill.FullName
  $destFingerprint = Get-DirectoryFingerprint -Path $dest
  $action = "add"

  if ($null -ne $destFingerprint) {
    if ($saved.ContainsKey($skill.Name)) {
      if ($destFingerprint -ne $saved[$skill.Name]) {
        $action = "conflict"
      } elseif ($destFingerprint -eq $sourceFingerprint) {
        $action = "unchanged"
      } else {
        $action = "update"
      }
    } elseif ($destFingerprint -eq $sourceFingerprint) {
      $action = "unchanged"
    } else {
      $action = "unknown-drift"
    }
  }

  if (($action -eq "conflict" -or $action -eq "unknown-drift") -and -not $Force) {
    $conflicts += $skill.Name
  }

  $actions += [PSCustomObject]@{
    Name = $skill.Name
    Source = $skill.FullName
    Destination = $dest
    SourceFingerprint = $sourceFingerprint
    Action = $action
  }
}

$orphans = @()
foreach ($savedName in $saved.Keys) {
  if (-not $sourceNames.ContainsKey($savedName)) {
    $orphanPath = Join-Path $CodexSkillsDir $savedName
    if (Test-Path -LiteralPath $orphanPath) {
      $orphans += $savedName
      Write-Host ("[orphan] {0} (left installed; no longer present in the source suite)" -f $savedName)
    }
  }
}

foreach ($item in $actions) {
  Write-Host ("[{0}] {1}" -f $item.Action, $item.Name)
}

if ($conflicts.Count -gt 0) {
  throw "Refusing to overwrite locally changed or untracked installed skills: $([string]::Join(', ', $conflicts)). Review the differences, promote intended changes into the source repo, then rerun. Use -Force only for an intentional replacement; existing folders will be backed up."
}

if ($DryRun) {
  Write-Host ""
  Write-Host "Dry run complete. Installed skills were not changed."
  exit 0
}

$stamp = (Get-Date -Format "yyyyMMdd-HHmmss") + "-" + [guid]::NewGuid().ToString("N").Substring(0, 8)
$stageRoot = Join-Path $CodexSkillsDir (".agentic-software-steward-stage-" + [guid]::NewGuid().ToString("N"))
$backupRoot = Join-Path $CodexSkillsDir (".agentic-software-steward-backups\" + $stamp)
$changed = @($actions | Where-Object { $_.Action -ne "unchanged" })

if ($changed.Count -gt 0) {
  New-Item -ItemType Directory -Force -Path $stageRoot | Out-Null
  foreach ($item in $changed) {
    Copy-Item -Recurse -Force -LiteralPath $item.Source -Destination $stageRoot
  }

  foreach ($item in $changed) {
    $stagedSkill = Join-Path $stageRoot $item.Name
    if (Test-Path -LiteralPath $item.Destination) {
      New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
      Move-Item -LiteralPath $item.Destination -Destination $backupRoot
    }
    Move-Item -LiteralPath $stagedSkill -Destination $item.Destination
    Write-Host "Synced $($item.Name)"
  }

  if (Test-Path -LiteralPath $stageRoot) {
    Remove-Item -Force -LiteralPath $stageRoot
  }
}

$stateSkills = [ordered]@{}
foreach ($item in $actions) {
  $stateSkills[$item.Name] = Get-DirectoryFingerprint -Path $item.Destination
}
foreach ($orphan in $orphans) {
  $stateSkills[$orphan] = Get-DirectoryFingerprint -Path (Join-Path $CodexSkillsDir $orphan)
}

$state = [ordered]@{
  version = 1
  repo_root = $RepoRoot
  synced_at = (Get-Date).ToString("o")
  skills = $stateSkills
}
$state | ConvertTo-Json -Depth 5 | Set-Content -Encoding UTF8 -LiteralPath $statePath

Write-Host ""
Write-Host "Installed skills directory: $CodexSkillsDir"
if (Test-Path -LiteralPath $backupRoot) {
  Write-Host "Backup of replaced skills: $backupRoot"
}
Write-Host "Restart Codex to pick up newly installed or changed skills."
