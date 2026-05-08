param(
  [string]$RepoRoot,
  [string]$TaskName = "AgenticSoftwareStewardSkillUpdate",
  [string]$LogPath,
  [switch]$StartupShortcutOnly
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot -or $RepoRoot.Trim() -eq "") {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $scriptDir "..")
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
$updateScript = Join-Path $RepoRoot "scripts\update-installed-skills.ps1"

if (-not (Test-Path -LiteralPath $updateScript)) {
  throw "Missing updater script: $updateScript"
}

if (-not $LogPath -or $LogPath.Trim() -eq "") {
  $logDir = Join-Path $RepoRoot "logs"
  if (-not (Test-Path -LiteralPath $logDir)) {
    New-Item -ItemType Directory -Force -Path $logDir | Out-Null
  }
  $LogPath = Join-Path $logDir "skill-auto-update.log"
}

$taskScript = @"
`$ErrorActionPreference = "Continue"
`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path "$LogPath" -Value "`n[`$timestamp] Starting Agentic Software skill update"
try {
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$updateScript" *>> "$LogPath"
  `$exitCode = `$LASTEXITCODE
  `$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Add-Content -Path "$LogPath" -Value "[`$timestamp] Finished with exit code `$exitCode"
} catch {
  `$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Add-Content -Path "$LogPath" -Value "[`$timestamp] ERROR: `$(`$_.Exception.Message)"
}
"@

$taskRunner = Join-Path $RepoRoot "scripts\run-auto-update.ps1"
Set-Content -Path $taskRunner -Value $taskScript -Encoding UTF8

function Install-StartupShortcut {
  param(
    [string]$RunnerPath,
    [string]$ShortcutName
  )

  $startupDir = [Environment]::GetFolderPath("Startup")
  if (-not (Test-Path -LiteralPath $startupDir)) {
    New-Item -ItemType Directory -Force -Path $startupDir | Out-Null
  }

  $shortcutPath = Join-Path $startupDir "$ShortcutName.lnk"
  $shell = New-Object -ComObject WScript.Shell
  $shortcut = $shell.CreateShortcut($shortcutPath)
  $shortcut.TargetPath = "powershell.exe"
  $shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$RunnerPath`""
  $shortcut.WorkingDirectory = $RepoRoot
  $shortcut.Description = "Pulls and installs the latest Agentic Software Steward skills at user logon."
  $shortcut.Save()

  return $shortcutPath
}

$installedMode = $null
$shortcutPath = $null

if (-not $StartupShortcutOnly) {
  try {
    $action = New-ScheduledTaskAction `
      -Execute "powershell.exe" `
      -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$taskRunner`""

    $trigger = New-ScheduledTaskTrigger -AtLogOn

    $settings = New-ScheduledTaskSettingsSet `
      -AllowStartIfOnBatteries `
      -DontStopIfGoingOnBatteries `
      -StartWhenAvailable `
      -MultipleInstances IgnoreNew

    Register-ScheduledTask `
      -TaskName $TaskName `
      -Action $action `
      -Trigger $trigger `
      -Settings $settings `
      -Description "Pulls and installs the latest Agentic Software Steward skills at user logon." `
      -Force | Out-Null

    $installedMode = "scheduled task"
  } catch {
    Write-Host "Scheduled task install failed: $($_.Exception.Message)"
    Write-Host "Falling back to a per-user Startup shortcut."
  }
}

if (-not $installedMode) {
  $shortcutPath = Install-StartupShortcut -RunnerPath $taskRunner -ShortcutName $TaskName
  $installedMode = "Startup shortcut"
}

Write-Host "Installed auto-update mode: $installedMode"
if ($shortcutPath) {
  Write-Host "Startup shortcut: $shortcutPath"
}
Write-Host "Updater script: $updateScript"
Write-Host "Task runner: $taskRunner"
Write-Host "Log file: $LogPath"
Write-Host ""
Write-Host "Auto-update runs at user logon. Restart Codex after updates are installed so changed skills are loaded."
