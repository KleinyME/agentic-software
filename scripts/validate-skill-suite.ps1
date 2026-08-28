[CmdletBinding()]
param(
  [string]$RepoRoot
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
  $RepoRoot = Split-Path -Parent $PSScriptRoot
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
$skillRoot = Join-Path $RepoRoot "agentic-software-steward\skills"
$manifestPath = Join-Path $RepoRoot "agentic-software-steward\.codex-plugin\plugin.json"
$quickValidator = Join-Path $env:USERPROFILE ".codex\skills\.system\skill-creator\scripts\quick_validate.py"
$errors = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $skillRoot -PathType Container)) {
  throw "Missing skill root: $skillRoot"
}

try {
  $manifest = Get-Content -Raw -Encoding UTF8 -LiteralPath $manifestPath | ConvertFrom-Json
  if (-not $manifest.name -or -not $manifest.version -or -not $manifest.skills) {
    $errors.Add("Plugin manifest is missing name, version, or skills.")
  }
} catch {
  $errors.Add("Plugin manifest is invalid JSON: $($_.Exception.Message)")
}

$skills = Get-ChildItem -LiteralPath $skillRoot -Directory | Sort-Object Name
if (-not $skills) {
  $errors.Add("No skills found under $skillRoot")
}

$env:PYTHONUTF8 = "1"
foreach ($skill in $skills) {
  $skillFile = Join-Path $skill.FullName "SKILL.md"
  if (-not (Test-Path -LiteralPath $skillFile -PathType Leaf)) {
    $errors.Add("$($skill.Name): missing SKILL.md")
    continue
  }

  $content = Get-Content -Raw -Encoding UTF8 -LiteralPath $skillFile
  $frontmatter = [regex]::Match($content, '(?s)\A---\r?\n(?<body>.*?)\r?\n---')
  if (-not $frontmatter.Success) {
    $errors.Add("$($skill.Name): invalid or missing YAML frontmatter")
    continue
  }

  $frontmatterBody = $frontmatter.Groups['body'].Value
  $nameMatch = [regex]::Match($frontmatterBody, '(?m)^name:\s*(?<value>[^\r\n]+)\s*$')
  $descriptionMatch = [regex]::Match($frontmatterBody, '(?m)^description:\s*(?<value>[^\r\n]+)\s*$')

  if (-not $nameMatch.Success) {
    $errors.Add("$($skill.Name): frontmatter is missing name")
  } elseif ($nameMatch.Groups['value'].Value.Trim(' ', '"', "'") -ne $skill.Name) {
    $errors.Add("$($skill.Name): frontmatter name does not match directory")
  }

  if (-not $descriptionMatch.Success -or -not $descriptionMatch.Groups['value'].Value.Trim()) {
    $errors.Add("$($skill.Name): frontmatter is missing description")
  }

  if ($content -match '\[TODO|TODO:') {
    $errors.Add("$($skill.Name): unresolved TODO placeholder in SKILL.md")
  }

  $markdownFiles = Get-ChildItem -LiteralPath $skill.FullName -Recurse -File -Filter '*.md'
  foreach ($markdownFile in $markdownFiles) {
    $markdown = Get-Content -Raw -Encoding UTF8 -LiteralPath $markdownFile.FullName
    $links = [regex]::Matches($markdown, '\]\((?<path>[^)]+\.md)(?:#[^)]+)?\)')
    foreach ($link in $links) {
      $target = $link.Groups['path'].Value
      if ($target -match '^(?:https?://|/|[A-Za-z]:\\)') {
        continue
      }
      $resolved = Join-Path $markdownFile.DirectoryName $target
      if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) {
        $relativeSource = $markdownFile.FullName.Substring($RepoRoot.Length).TrimStart('\')
        $errors.Add("$relativeSource`: missing linked reference $target")
      }
    }
  }

  $openAiPath = Join-Path $skill.FullName "agents\openai.yaml"
  if (Test-Path -LiteralPath $openAiPath -PathType Leaf) {
    $openAi = Get-Content -Raw -Encoding UTF8 -LiteralPath $openAiPath
    if ($openAi -notmatch [regex]::Escape("`$$($skill.Name)")) {
      $errors.Add("$($skill.Name): agents/openai.yaml default prompt does not mention `$$($skill.Name)")
    }
  }

  if (Test-Path -LiteralPath $quickValidator -PathType Leaf) {
    & python $quickValidator $skill.FullName | Out-Host
    if ($LASTEXITCODE -ne 0) {
      $errors.Add("Codex quick validation failed: $($skill.Name)")
    }
  }
}

if (-not (Test-Path -LiteralPath $quickValidator -PathType Leaf)) {
  $errors.Add("Missing Codex skill validator: $quickValidator")
}

$visualTest = Join-Path $skillRoot "visual-direction\scripts\collect-client-site-images.test.mjs"
if (Test-Path -LiteralPath $visualTest -PathType Leaf) {
  & node --test $visualTest | Out-Host
  if ($LASTEXITCODE -ne 0) {
    $errors.Add("Visual asset collector tests failed")
  }
} else {
  $errors.Add("Missing visual asset collector test: $visualTest")
}

$syncTest = Join-Path $RepoRoot "scripts\sync-skills.test.mjs"
if (Test-Path -LiteralPath $syncTest -PathType Leaf) {
  & node --test $syncTest | Out-Host
  if ($LASTEXITCODE -ne 0) {
    $errors.Add("Cross-context skill sync tests failed")
  }
} else {
  $errors.Add("Missing cross-context skill sync test: $syncTest")
}

$requiredFiles = @(
  "agentic-software-steward\skills\project-steward\SKILL.md",
  "agentic-software-steward\skills\project-steward\references\routing-regression-cases.md",
  "agentic-software-steward\skills\creative-director\SKILL.md",
  "agentic-software-steward\skills\brand-direction\SKILL.md",
  "agentic-software-steward\skills\design-distinctiveness\SKILL.md",
  "agentic-software-steward\skills\design-distinctiveness\references\batch-rotation.md",
  "agentic-software-steward\skills\design-distinctiveness\references\vernacular-artifacts.md",
  "agentic-software-steward\skills\visual-direction\SKILL.md",
  "agentic-software-steward\skills\live-environment-steward\references\demo-crawlability.md",
  "agentic-software-steward\skills\repo-foundation-bootstrap\assets\CLIENT_REVIEW.template.md",
  "agentic-software-steward\skills\repo-foundation-bootstrap\assets\DEPLOYMENT_READINESS.template.md",
  "agentic-software-steward\skills\100-year-copywriting-engine\SKILL.md",
  "agentic-software-steward\skills\100-year-copywriting-engine\references\frameworks.md",
  "agentic-software-steward\skills\brand-copy-steward\SKILL.md",
  "agentic-software-steward\skills\ai-writing-audit\SKILL.md",
  "agentic-software-steward\skills\ai-writing-audit\LICENSE",
  "agentic-software-steward\skills\ai-writing-audit\NOTICE.md",
  "agentic-software-steward\skills\audience-boundary\SKILL.md",
  "agentic-software-steward\skills\audience-boundary\assets\public-copy.schema.template.json",
  "agentic-software-steward\skills\software-steward\references\agentic-harness-model.md",
  "agentic-software-steward\skills\software-steward\references\executive-operating-loop.md",
  "agentic-software-steward\skills\software-steward\references\non-obvious-option-pass.md",
  "agentic-software-steward\skills\software-steward\references\validation-scenarios.md",
  "agentic-software-steward\skills\workflow-automation-architect\SKILL.md",
  "agentic-software-steward\skills\workflow-automation-architect\references\friction-observer.md",
  "agentic-software-steward\skills\graph-engineering\SKILL.md",
  "agentic-software-steward\skills\graph-engineering\references\skill-directed-agent-assembly.md",
  "agentic-software-steward\skills\site-scorecard\references\ad-hoc-prospect-blueprint.md",
  "agentic-software-steward\third_party\ai-writing-audit\LICENSE",
  "agentic-software-steward\third_party\ai-writing-audit\NOTICE.md",
  "agentic-software-steward\third_party\licenses\humanizer-MIT.txt",
  "agentic-software-steward\third_party\licenses\marketingskills-MIT.txt",
  "hermes-runtime-skills\software-development\client-website-delivery\SKILL.md",
  "scripts\sync-skills.test.mjs"
)

foreach ($relativePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot $relativePath) -PathType Leaf)) {
    $errors.Add("Missing required file: $relativePath")
  }
}

$skillText = Get-ChildItem -LiteralPath $skillRoot -Recurse -File -Filter '*.md' |
  ForEach-Object { Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8 } |
  Out-String

foreach ($concept in @(
  'concept-preview', 'functional-preview', 'production-candidate', 'production-verified',
  'CLIENT_REVIEW.md', 'DEPLOYMENT_READINESS.md', 'project-steward', 'creative-director',
  'brand-direction', 'design-distinctiveness', 'visual-direction', 'ai-writing-audit',
  'x-authority', 'Only-This-Business Test', 'Demo Crawlability', 'graph-engineering',
  'workflow-automation-architect', 'fresh-context', 'audience-boundary'
)) {
  if (-not $skillText.Contains($concept)) {
    $errors.Add("Missing suite concept: $concept")
  }
}

$behaviorContracts = @(
  @{ Path = "agentic-software-steward\skills\project-steward\SKILL.md"; Phrases = @('Transferable Decision Rules', 'The route should remain stable', 'Project association is not activation', 'feasibility envelope') },
  @{ Path = "agentic-software-steward\skills\creative-director\SKILL.md"; Phrases = @('Default to broad freedom', 'Use ordinary qualitative marketing language confidently', 'Do not escalate from category association alone') },
  @{ Path = "agentic-software-steward\skills\brand-direction\SKILL.md"; Phrases = @('Treat reference sites as grounding', 'push beyond the inferred comfort zone', 'CLIENT_REVIEW.md') },
  @{ Path = "agentic-software-steward\skills\design-distinctiveness\SKILL.md"; Phrases = @('Start from observed business truth', 'Business fit outranks forced variety', 'not a roulette wheel') },
  @{ Path = "agentic-software-steward\skills\visual-direction\SKILL.md"; Phrases = @('collect-client-site-images.mjs', 'Do not collect competitor imagery for reuse', 'Generate one anchor image first') },
  @{ Path = "agentic-software-steward\skills\brand-copy-steward\SKILL.md"; Phrases = @('every newly created or materially changed user-facing surface', 'Never render prompts', 'Verify The Actual Experience') },
  @{ Path = "agentic-software-steward\skills\no-theater-software\SKILL.md"; Phrases = @('Full intended dashboards', 'Do not reduce the intended experience', 'production-verified', 'Clean Output Boundary') },
  @{ Path = "agentic-software-steward\skills\live-environment-steward\SKILL.md"; Phrases = @('deindex without blocking machine-readable review', 'canonical production site that remains de-indexed is blocked from promotion') },
  @{ Path = "agentic-software-steward\skills\software-steward\SKILL.md"; Phrases = @('Role Boundary', 'Technical Contract', 'Experience Integration', 'Agentic Software Harness') },
  @{ Path = "agentic-software-steward\skills\release-steward\SKILL.md"; Phrases = @('preview release is for client or owner review', 'official production target', 'Preserve The Live Baseline', 'deployment protection', 'absolute production `og:image` returns 200', 'no retired product or offer names') }
)

foreach ($contract in $behaviorContracts) {
  $contractText = Get-Content -LiteralPath (Join-Path $RepoRoot $contract.Path) -Raw -Encoding UTF8
  foreach ($phrase in $contract.Phrases) {
    if ($contractText.IndexOf($phrase, [System.StringComparison]::OrdinalIgnoreCase) -lt 0) {
      $errors.Add("Behavior contract missing in $($contract.Path): $phrase")
    }
  }
}

$copyEnginePath = Join-Path $skillRoot "100-year-copywriting-engine\SKILL.md"
$frameworksPath = Join-Path $skillRoot "100-year-copywriting-engine\references\frameworks.md"
$brandCopyPath = Join-Path $skillRoot "brand-copy-steward\SKILL.md"
$writingAuditPath = Join-Path $skillRoot "ai-writing-audit\SKILL.md"
$audienceBoundaryPath = Join-Path $skillRoot "audience-boundary\SKILL.md"
$publicCopySchemaPath = Join-Path $skillRoot "audience-boundary\assets\public-copy.schema.template.json"
$softwareStewardPath = Join-Path $skillRoot "software-steward\SKILL.md"
$agenticHarnessPath = Join-Path $skillRoot "software-steward\references\agentic-harness-model.md"
$executiveOperatingLoopPath = Join-Path $skillRoot "software-steward\references\executive-operating-loop.md"
$nonObviousOptionPath = Join-Path $skillRoot "software-steward\references\non-obvious-option-pass.md"
$validationScenariosPath = Join-Path $skillRoot "software-steward\references\validation-scenarios.md"
$workflowAutomationPath = Join-Path $skillRoot "workflow-automation-architect\SKILL.md"
$frictionObserverPath = Join-Path $skillRoot "workflow-automation-architect\references\friction-observer.md"
$graphEngineeringPath = Join-Path $skillRoot "graph-engineering\SKILL.md"
$skillDirectedAssemblyPath = Join-Path $skillRoot "graph-engineering\references\skill-directed-agent-assembly.md"

$copyEngine = Get-Content -Raw -Encoding UTF8 -LiteralPath $copyEnginePath
if ($copyEngine -match 'AUTO-VOICE SELECTION ENGINE|Auto-selected voice approach|Tap the orange arrow') {
  $errors.Add("100-year-copywriting-engine: obsolete automatic voice or UI invocation text returned")
}
foreach ($pattern in @('Choose Strategy Before Framework', 'public copy', 'Never send a raw model response', "When Ken's voice is explicitly requested")) {
  if ($copyEngine -notmatch [regex]::Escape($pattern)) {
    $errors.Add("100-year-copywriting-engine: missing copy invariant '$pattern'")
  }
}

$frameworks = Get-Content -Raw -Encoding UTF8 -LiteralPath $frameworksPath
if ($frameworks -match '\*\*Effectiveness:\*\*|\d+% success rate') {
  $errors.Add("100-year-copywriting-engine: unsupported framework performance percentages returned")
}

$brandCopy = Get-Content -Raw -Encoding UTF8 -LiteralPath $brandCopyPath
if ($brandCopy -notmatch 'raw model/tool output') {
  $errors.Add("brand-copy-steward: raw-output UI protection is missing")
}

$writingAudit = Get-Content -Raw -Encoding UTF8 -LiteralPath $writingAuditPath
if ($writingAudit -notmatch 'Run A Second Audit' -or $writingAudit -notmatch 'writing sample exists') {
  $errors.Add("ai-writing-audit: voice-sample precedence or second-audit behavior is missing")
}

$audienceBoundary = Get-Content -Raw -Encoding UTF8 -LiteralPath $audienceBoundaryPath
if ($audienceBoundary -notmatch 'validated public projection' -or $audienceBoundary -notmatch 'raw model') {
  $errors.Add("audience-boundary: raw model-to-UI protection is missing")
}

try {
  $publicCopySchema = Get-Content -Raw -Encoding UTF8 -LiteralPath $publicCopySchemaPath | ConvertFrom-Json
  if ($publicCopySchema.additionalProperties -ne $false) {
    $errors.Add("audience-boundary: public copy schema must reject additional properties")
  }
} catch {
  $errors.Add("audience-boundary: public copy schema is invalid JSON: $($_.Exception.Message)")
}

$softwareSteward = Get-Content -Raw -Encoding UTF8 -LiteralPath $softwareStewardPath
foreach ($pattern in @('references/agentic-harness-model.md', 'references/executive-operating-loop.md', 'references/non-obvious-option-pass.md', 'Toby pattern', 'one accountable assembler')) {
  if ($softwareSteward -notmatch [regex]::Escape($pattern)) {
    $errors.Add("software-steward: missing harness invariant '$pattern'")
  }
}

$nonObviousOption = Get-Content -Raw -Encoding UTF8 -LiteralPath $nonObviousOptionPath
foreach ($pattern in @('Run It Only After A Baseline Exists', 'Cognitive Personality', 'thinking_moves:', 'strange_leap:', 'Let the weirdness appear in the conceptual leap', 'Keep the pass read-only and advisory')) {
  if ($nonObviousOption -notmatch [regex]::Escape($pattern)) {
    $errors.Add("non-obvious-option-pass: missing safety invariant '$pattern'")
  }
}

$workflowAutomation = Get-Content -Raw -Encoding UTF8 -LiteralPath $workflowAutomationPath
foreach ($pattern in @('Expand Initiative Without Expanding Authority', 'references/friction-observer.md', 'executive-operating-loop.md', 'standing autonomy charter', 'execute_gated')) {
  if ($workflowAutomation -notmatch [regex]::Escape($pattern)) {
    $errors.Add("workflow-automation-architect: missing proactivity invariant '$pattern'")
  }
}

$agenticHarness = Get-Content -Raw -Encoding UTF8 -LiteralPath $agenticHarnessPath
foreach ($pattern in @('skill-based instruction harness', 'Five-Layer Architecture', 'Task-Specific Capability Packets', 'Skill-Directed Dispatch And Assembly', 'Executive Direction And Activation', 'Runtime Graduation Gates', 'Do not optimize context by omitting required safety')) {
  if ($agenticHarness -notmatch [regex]::Escape($pattern)) {
    $errors.Add("agentic-harness-model: missing harness invariant '$pattern'")
  }
}

$executiveOperatingLoop = Get-Content -Raw -Encoding UTF8 -LiteralPath $executiveOperatingLoopPath
foreach ($pattern in @('CEO Agent: Direction And Portfolio Judgment', 'COO Agent: Work Conversion And Flow', 'Marketing Agent: Market Sense And Experiment Design', 'Fresh-Context Contract', 'degraded_single_context', 'Standing Autonomy Charter', 'executive_work_item', 'without new per-run approval', 'Hermes as strategic authority')) {
  if ($executiveOperatingLoop -notmatch [regex]::Escape($pattern)) {
    $errors.Add("executive-operating-loop: missing authority invariant '$pattern'")
  }
}

$validationScenarios = Get-Content -Raw -Encoding UTF8 -LiteralPath $validationScenariosPath
foreach ($pattern in @('Scenario 47: Harness Is Not Yet A Factory Runtime', 'Scenario 48: Weirdo Personality Is Not Cosplay', 'Scenario 49: Capability Packet Cannot Drop Safety', 'Scenario 50: Charter-Governed Executive Loop', 'Scenario 51: Executive Title Does Not Grant Authority', 'Scenario 52: One Agent Changing Hats Loses Independence', 'Scenario 53: Skills Dispatch Fresh Agents And Assemble Once', 'Scenario 54: Parallel Agents Cannot Share A Write Target')) {
  if ($validationScenarios -notmatch [regex]::Escape($pattern)) {
    $errors.Add("validation-scenarios: missing harness regression '$pattern'")
  }
}

$frictionObserver = Get-Content -Raw -Encoding UTF8 -LiteralPath $frictionObserverPath
foreach ($pattern in @('evidence collector, not a manager', 'workflow_friction_observation', 'must not rewrite prompts, skills, policies, permissions, production behavior')) {
  if ($frictionObserver -notmatch [regex]::Escape($pattern)) {
    $errors.Add("friction-observer: missing learning-safety invariant '$pattern'")
  }
}

$graphEngineering = Get-Content -Raw -Encoding UTF8 -LiteralPath $graphEngineeringPath
foreach ($pattern in @('Independent Perspectives Are Not Automatically A Graph', 'references/skill-directed-agent-assembly.md', 'degraded_single_context')) {
  if ($graphEngineering -notmatch [regex]::Escape($pattern)) {
    $errors.Add("graph-engineering: missing topology guardrail '$pattern'")
  }
}

$skillDirectedAssembly = Get-Content -Raw -Encoding UTF8 -LiteralPath $skillDirectedAssemblyPath
foreach ($pattern in @('Skill-Directed Agent Dispatch And Assembly', 'root harness', 'context_mode: fresh', 'worker_return:', 'Accountable assembler', 'Assembly is not concatenation', 'Do not let parallel workers write the same artifact')) {
  if ($skillDirectedAssembly -notmatch [regex]::Escape($pattern)) {
    $errors.Add("skill-directed-agent-assembly: missing dispatch invariant '$pattern'")
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
$fixtureOnlyTokens = @('No experience required', 'beginner-friendly', 'made for date night', 'Couple Crate', 'Parts Syndicate', 'SmartDash', 'Haltech', 'PepThrive', 'assembly_uuid', 'resin-kit', 'peptide project', 'SDS review')
foreach ($relativePath in $universalSkillPaths) {
  $universalText = Get-Content -LiteralPath (Join-Path $RepoRoot $relativePath) -Raw -Encoding UTF8
  foreach ($token in $fixtureOnlyTokens) {
    if ($universalText.IndexOf($token, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
      $errors.Add("Historical fixture leaked into universal skill ${relativePath}: $token")
    }
  }
}

$scaffoldMatches = Get-ChildItem -LiteralPath $skillRoot -Recurse -File -Filter '*.md' | Select-String -Pattern '[TODO:' -SimpleMatch
if ($scaffoldMatches) {
  $errors.Add("Scaffold TODO placeholders remain")
}

if (Get-Command git -ErrorAction SilentlyContinue) {
  & git -C $RepoRoot diff --check | Out-Host
  if ($LASTEXITCODE -ne 0) {
    $errors.Add("git unstaged diff --check failed")
  }

  & git -C $RepoRoot diff --cached --check | Out-Host
  if ($LASTEXITCODE -ne 0) {
    $errors.Add("git staged diff --check failed")
  }

  & git -C $RepoRoot rev-parse --verify --quiet origin/main *> $null
  if ($LASTEXITCODE -eq 0) {
    & git -C $RepoRoot diff --check origin/main...HEAD | Out-Host
    if ($LASTEXITCODE -ne 0) {
      $errors.Add("git origin/main...HEAD diff --check failed")
    }
  }
}

if ($errors.Count -gt 0) {
  Write-Host ""
  Write-Host "Skill suite validation failed:" -ForegroundColor Red
  $errors | ForEach-Object { Write-Host "- $_" -ForegroundColor Red }
  exit 1
}

Write-Host ""
Write-Host "Validated $($skills.Count) skills and plugin manifest $($manifest.version)." -ForegroundColor Green
