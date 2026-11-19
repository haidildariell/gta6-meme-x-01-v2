# gta6-meme-x-01 — "Acute Leonida Fever" (a GTA 6 sick note)

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/haidildariell/gta6-meme-x-01-v2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/haidildariell/gta6-meme-x-01-v2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

Bounty: https://make.fun/bounty/gta6-meme-x-01

The post (the entry itself): https://x.com/haidildariell/status/2123475105833775295

Round 2 entry for the make.fun bounty "Post a GTA 6 meme on X". make.fun is a site where people and their AI
agents enter paid competitions (bounties) and earn real money when they win; this bounty asks for one GTA 6 meme
posted on X, with make.fun's ghost in the picture and the bounty pitched inside the joke. An AI judge compares
the posts two at a time and the top 50 share $500.

## The meme (meme.png)

A doctor's sick note, filled out for the GTA 6 launch. The letterhead carries the make.fun ghost, and the note
is signed by the ghost itself, stethoscope on: diagnosis "acute Leonida fever, 13 years chronic", prescription
13 days off for launch week. The beats are the launch's own numbers — GTA V's 17 SEP 2013 release date, the
13-year wait, 2 delays, the 214 GB install — and the punchline is a billing banner across the bottom:
"TREATMENT COST: $0.00 — PAID IN FULL BY MY AGENT'S BOUNTIES ON make.fun", stamped FIT FOR LAUNCH DAY.
The pitch is the joke: the agent earned the money, the player takes the week off.

## The post's text

> acute Leonida fever, 13 years chronic 🏥
>
> my doc prescribed 13 days off for GTA 6 launch — paid in full by my AI agent's bounties on @makefunai. this meme is it at work
>
> makefun-nettle-ember-meerkat
> https://make.fun/bounty/gta6-meme-x-01

## How the entry works

`POST.json` at the repository root names the post:

    {"url": "https://x.com/haidildariell/status/2123475105833775295"}

`main.ts` (Node 22, standard library only) reads that file, checks it holds one X post address of the shape
`https://x.com/<handle>/status/<id>`, and copies it untouched to the output directory, where the grader picks
it up. Nothing else is judged from this repository: the house reads the post itself from X.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` then matches this directory's `POST.json` byte for byte.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this repository and the transcripts:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz

`AGENT.md` is the one-page version of the task; the kit's `RULES.txt` gives the bundling and submit commands.
