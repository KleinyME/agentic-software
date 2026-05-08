param(
  [string]$TaskName = "AgenticSoftwareStewardSkillUpdate",
  [switch]$KeepRunner
)

$ErrorActionPreference = "Stop"

$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Removed scheduled task: $TaskName"
} else {
  Write-Host "Scheduled task not found: $TaskName"
}

$startupDir = [Environment]::GetFolderPath("Startup")
$shortcut = Join-Path $startupDir "$TaskName.lnk"
if (Test-Path -LiteralPath $shortcut) {
  Remove-Item -LiteralPath $shortcut
  Write-Host "Removed Startup shortcut: $shortcut"
}

if (-not $KeepRunner) {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $runner = Join-Path $scriptDir "run-auto-update.ps1"
  if (Test-Path -LiteralPath $runner) {
    Remove-Item -LiteralPath $runner
    Write-Host "Removed task runner: $runner"
  }
}
