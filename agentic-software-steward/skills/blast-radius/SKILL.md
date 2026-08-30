---
name: blast-radius
description: Work out what a small-looking change could break elsewhere, and prove the one fact it is safe because of by running code.
disable-model-invocation: true
---

# Blast Radius

Find what a change breaks somewhere else, before it ships. Use for "blast radius of X", "what could this break", or reviewing a small diff you do not trust yet.

This is the forward-looking companion to `intent-aligned-review`, which judges whether the change is the right change, and to `diagnosing-bugs`, which works backwards from a failure that already happened. Blast radius works forwards from a change that has not shipped.

Listing the callers is not the job. Grep finds those in a second. The job is the breakage grep will not show you.

## Do Not Trust Your Own Writeup

A blast-radius writeup that sounds right is worthless. It reads as convincing whether or not it is true, and that is the trap you are walking into. So do not hand back the writeup. Find the one or two facts the whole thing depends on and prove them by running code. Words are where you start, not what you ship.

## How Sure Are You

For each fact the change's safety depends on, get it as far down this ladder as is cheap, and say where it stopped.

1. You said so. Worthless on its own.
2. You pointed at the line. A real `file:line`, or the library's own source.
3. You showed the bad case cannot happen. You walked the failure step by step and it does not reach.
4. You ran it. A script or test that calls the real code and fails loud if you are wrong.
5. You reproduced it in the running app.

Any safety fact you cannot get to rung 4, say so out loud. Do not write it up as settled. Rung 4 is usually one small script that imports the same library the app ships and calls the exact function you are worried about.

## Steps

1. Read the change. The diff, the symbols it adds, changes, and deletes, and what it now does differently, including the part the diff does not spell out. Pull the pull request and the commits around it for the intent behind it.
2. Find the one fact it is safe because of. Most changes that look scary are safe because of a single fact, such as "this call only drops already-dead cache entries and does nothing else". Find that fact. If it holds, most of the scary cases die at once. Spend your time here, not on a long list of maybes.
3. Look where grep stops. Read the source of the library you call, and check its pinned version and any local patch. Work out when things run: microtasks, unmount and teardown, differences between frameworks. Follow what a symbol search misses: the JSON an API returns, a database column, a wire format, another language reading the same bytes, a feature flag, code three hops downstream.
4. Be honest about each risk. Give it a real chance of happening and a real cost if it does. Keep the risks you confirmed; list the ones you checked and cleared separately. Cite a real `file:line`. A search that finds nothing is still an answer. Never invent a caller or an API.
5. Prove the one fact. Write a script or test that runs the real code, run it, and paste what happened. If you cannot prove it cheaply, mark it unproven. Do not round up.
6. For a big or wide change, get a genuinely separate opinion: dispatch an independent reviewer in a fresh read-only context with the same question, using a different model from the producer's where the host offers a choice; otherwise an independent fresh context. Merge the answers. Independent readers catch different real bugs.

## What To Hand Back

- **What it does.** What changed, including the part that is not obvious.
- **The one fact it is safe because of.** State it, say which rung you got it to, and show the proof. If you could not prove it, write unproven.
- **Risks.** Only the real ones. Each names how it breaks, the `file:line`, how likely and how bad, and how to check. Paste the proof for the ones that matter.
- **Cleared.** What you checked and why it is fine.
- **Before you merge.** The cheapest test or repro that catches the real bug, including the script you wrote.

Cite real code, and strip anything private before this goes anywhere public. If the writeup will be read by a client, run it through `ai-writing-audit` first. Route the run's decision trail through `show-me-your-work` instead of narrating it inline.

Reply with the writeup above, with the one safety fact either proven or marked unproven.
