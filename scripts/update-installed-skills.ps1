param(
  [string]$RepoRoot,
  [string]$CodexSkillsDir,
  [switch]$NoPull,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot -or $RepoRoot.Trim() -eq "") {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $scriptDir "..")
}

if (-not $CodexSkillsDir -or $CodexSkillsDir.Trim() -eq "") {
  $CodexSkillsDir = Join-Path $env:USERPROFILE ".codex\skills"
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
$sourceSkillsDir = Join-Path $RepoRoot "agentic-software-steward\skills"

if (-not (Test-Path -LiteralPath $sourceSkillsDir)) {
  throw "Missing skill source directory: $sourceSkillsDir"
}

if (-not $NoPull) {
  Write-Host "Pulling latest changes for $RepoRoot ..."
  if ($DryRun) {
    Write-Host "[dry-run] git -C `"$RepoRoot`" pull --ff-only"
  } else {
    git -C $RepoRoot pull --ff-only
  }
}

if (-not (Test-Path -LiteralPath $CodexSkillsDir)) {
  if ($DryRun) {
    Write-Host "[dry-run] create $CodexSkillsDir"
  } else {
    New-Item -ItemType Directory -Force -Path $CodexSkillsDir | Out-Null
  }
}

$skills = Get-ChildItem -Directory -LiteralPath $sourceSkillsDir | Where-Object {
  Test-Path -LiteralPath (Join-Path $_.FullName "SKILL.md")
}

if (-not $skills -or $skills.Count -eq 0) {
  throw "No skills found under $sourceSkillsDir"
}

foreach ($skill in $skills) {
  $dest = Join-Path $CodexSkillsDir $skill.Name
  if ($DryRun) {
    Write-Host "[dry-run] sync $($skill.FullName) -> $dest"
  } else {
    Copy-Item -Recurse -Force -LiteralPath $skill.FullName -Destination $CodexSkillsDir
    Write-Host "Synced $($skill.Name)"
  }
}

Write-Host ""
Write-Host "Installed skills directory: $CodexSkillsDir"
Write-Host "Restart Codex to pick up newly installed or changed skills."

