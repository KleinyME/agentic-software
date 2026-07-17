param(
  [string]$RepoRoot
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot -or $RepoRoot.Trim() -eq "") {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $RepoRoot = Resolve-Path (Join-Path $scriptDir "..")
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
$skillsRoot = Join-Path $RepoRoot "agentic-software-steward\skills"
$validator = Join-Path $env:USERPROFILE ".codex\skills\.system\skill-creator\scripts\quick_validate.py"

if (-not (Test-Path -LiteralPath $validator)) {
  throw "Missing Codex skill validator: $validator"
}

$env:PYTHONUTF8 = "1"
$failures = [System.Collections.Generic.List[string]]::new()

Get-ChildItem -LiteralPath $skillsRoot -Directory | ForEach-Object {
  $skillFile = Join-Path $_.FullName "SKILL.md"
  if (Test-Path -LiteralPath $skillFile) {
    & python $validator $_.FullName | Out-Host
    if ($LASTEXITCODE -ne 0) {
      $failures.Add("Skill validation failed: $($_.Name)")
    }
  }
}

$visualTest = Join-Path $skillsRoot "visual-direction\scripts\collect-client-site-images.test.mjs"
& node --test $visualTest | Out-Host
if ($LASTEXITCODE -ne 0) {
  $failures.Add("Visual asset collector tests failed")
}

$requiredFiles = @(
  "agentic-software-steward\skills\brand-direction\SKILL.md",
  "agentic-software-steward\skills\design-distinctiveness\SKILL.md",
  "agentic-software-steward\skills\design-distinctiveness\agents\openai.yaml",
  "agentic-software-steward\skills\design-distinctiveness\references\batch-rotation.md",
  "agentic-software-steward\skills\design-distinctiveness\references\vernacular-artifacts.md",
  "agentic-software-steward\skills\visual-direction\SKILL.md",
  "agentic-software-steward\skills\ai-writing-audit\SKILL.md",
  "agentic-software-steward\skills\ai-writing-audit\LICENSE",
  "agentic-software-steward\skills\ai-writing-audit\NOTICE.md",
  "agentic-software-steward\skills\project-steward\SKILL.md",
  "agentic-software-steward\skills\project-steward\references\routing-regression-cases.md",
  "agentic-software-steward\skills\creative-director\SKILL.md",
  "agentic-software-steward\skills\live-environment-steward\references\demo-crawlability.md",
  "agentic-software-steward\skills\repo-foundation-bootstrap\assets\CLIENT_REVIEW.template.md",
  "agentic-software-steward\skills\repo-foundation-bootstrap\assets\DEPLOYMENT_READINESS.template.md",
  "agentic-software-steward\third_party\ai-writing-audit\LICENSE",
  "agentic-software-steward\third_party\ai-writing-audit\NOTICE.md"
)

foreach ($relativePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot $relativePath))) {
    $failures.Add("Missing required file: $relativePath")
  }
}

$skillText = Get-ChildItem -LiteralPath $skillsRoot -Recurse -File -Filter "*.md" |
  ForEach-Object { Get-Content -LiteralPath $_.FullName -Raw } |
  Out-String

$requiredConcepts = @(
  "concept-preview",
  "functional-preview",
  "production-candidate",
  "production-verified",
  "CLIENT_REVIEW.md",
  "DEPLOYMENT_READINESS.md",
  "brand-direction",
  "design-distinctiveness",
  "visual-direction",
  "ai-writing-audit",
  "project-steward",
  "creative-director",
  "x-authority",
  "Only-This-Business Test",
  "Demo Crawlability"
)

foreach ($concept in $requiredConcepts) {
  if (-not $skillText.Contains($concept)) {
    $failures.Add("Missing suite concept: $concept")
  }
}

$behaviorContracts = @(
  @{
    Path = "agentic-software-steward\skills\brand-direction\SKILL.md"
    Phrases = @("Treat reference sites as grounding", "push beyond the inferred comfort zone", "CLIENT_REVIEW.md")
  },
  @{
    Path = "agentic-software-steward\skills\visual-direction\SKILL.md"
    Phrases = @("collect-client-site-images.mjs", "Do not collect competitor imagery for reuse", "Generate one anchor image first")
  },
  @{
    Path = "agentic-software-steward\skills\brand-copy-steward\SKILL.md"
    Phrases = @("Create first; verify for production second", "Never place these inside", "CLIENT_REVIEW.md")
  },
  @{
    Path = "agentic-software-steward\skills\no-theater-software\SKILL.md"
    Phrases = @("Full intended dashboards", "Do not reduce the intended experience", "production-verified")
  },
  @{
    Path = "agentic-software-steward\skills\project-steward\SKILL.md"
    Phrases = @("Transferable Decision Rules", "The route should remain stable", "Project association is not activation", "Feasibility envelope")
  },
  @{
    Path = "agentic-software-steward\skills\creative-director\SKILL.md"
    Phrases = @("Default to broad freedom", "Use ordinary qualitative marketing language confidently", "Treat expressive depiction separately", "Do not escalate from category association alone")
  },
  @{
    Path = "agentic-software-steward\skills\design-distinctiveness\SKILL.md"
    Phrases = @("Start from observed business truth", "Business fit outranks forced variety", "source-supported for concept work", "not a roulette wheel")
  },
  @{
    Path = "agentic-software-steward\skills\live-environment-steward\SKILL.md"
    Phrases = @("deindex without blocking machine-readable review", "canonical production site that remains de-indexed is blocked from promotion")
  },
  @{
    Path = "agentic-software-steward\skills\software-steward\SKILL.md"
    Phrases = @("Role Boundary", "Technical Contract", "Experience Integration")
  },
  @{
    Path = "agentic-software-steward\skills\release-steward\SKILL.md"
    Phrases = @("preview release is for client or owner review", "official production target", "Preserve The Live Baseline", "For public production, confirm the canonical target")
  }
)

foreach ($contract in $behaviorContracts) {
  $contractPath = Join-Path $RepoRoot $contract.Path
  $contractText = Get-Content -LiteralPath $contractPath -Raw
  foreach ($phrase in $contract.Phrases) {
    if ($contractText.IndexOf($phrase, [System.StringComparison]::OrdinalIgnoreCase) -lt 0) {
      $failures.Add("Behavior contract missing in $($contract.Path): $phrase")
    }
  }
}

$universalSkillPaths = @(
  "agentic-software-steward\skills\project-steward\SKILL.md",
  "agentic-software-steward\skills\creative-director\SKILL.md",
  "agentic-software-steward\skills\software-steward\SKILL.md",
  "agentic-software-steward\skills\brand-copy-steward\SKILL.md",
  "agentic-software-steward\skills\brand-direction\SKILL.md",
  "agentic-software-steward\skills\design-distinctiveness\SKILL.md",
  "agentic-software-steward\skills\project-memory-steward\SKILL.md"
)

$fixtureOnlyTokens = @(
  "No experience required",
  "beginner-friendly",
  "made for date night",
  "Couple Crate",
  "Parts Syndicate",
  "SmartDash",
  "Haltech",
  "PepThrive",
  "assembly_uuid",
  "resin-kit",
  "peptide project",
  "SDS review"
)

foreach ($relativePath in $universalSkillPaths) {
  $universalText = Get-Content -LiteralPath (Join-Path $RepoRoot $relativePath) -Raw
  foreach ($token in $fixtureOnlyTokens) {
    if ($universalText.IndexOf($token, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
      $failures.Add("Historical fixture leaked into universal skill ${relativePath}: $token")
    }
  }
}

$scaffoldMatches = Get-ChildItem -LiteralPath $skillsRoot -Recurse -File -Filter "*.md" |
  Select-String -Pattern "[TODO:" -SimpleMatch
if ($scaffoldMatches) {
  $failures.Add("Scaffold TODO placeholders remain")
}

& git -C $RepoRoot diff --check | Out-Host
if ($LASTEXITCODE -ne 0) {
  $failures.Add("git diff --check failed")
}

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Suite validation failed:" -ForegroundColor Red
  $failures | ForEach-Object { Write-Host "- $_" -ForegroundColor Red }
  exit 1
}

Write-Host ""
Write-Host "Suite validation passed." -ForegroundColor Green
Write-Host "Skills: $((Get-ChildItem -LiteralPath $skillsRoot -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') }).Count)"
