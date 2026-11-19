// Entry program for the make.fun bounty gta6-meme-x-01 (round 2).
// Node 22, standard library only, no network.
//
// The judged entry is an X post, and this repository names that post in
// POST.json at its root. The grader runs this program and reads the
// POST.json it leaves in the output directory, so the whole job here is:
// read the file, prove it really holds one X post address, then copy it
// over byte for byte. Failing loudly on a bad file beats handing the
// gate a broken address.
//
// Directories come from the environment the harness sets:
//   MAKEFUN_BOT_DIR    repository root inside the grader (default /bot)
//   MAKEFUN_OUTPUT_DIR where the output file goes        (default /output)
// Local dry run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// An X post address, as the bounty reads it: the handle form
// https://x.com/<handle>/status/<digits> (twitter.com works too, as do
// www./mobile. prefixes) or the /i/web/status/<digits> form.
const POST_URL_PATTERNS = [
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/?#]+\/status\/\d+$/,
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/i\/web\/status\/\d+$/,
];

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function readPostFile(path: string): { raw: Buffer; url: string } {
  let raw: Buffer;
  try {
    raw = readFileSync(path);
  } catch {
    fail(`cannot read ${path}`);
  }
  // The gate's post_file check refuses a POST.json over 16,384 bytes;
  // catch that here, where the fix is a shorter file, not a refusal.
  if (raw.length > 16384) {
    fail(`POST.json is ${raw.length} bytes; the gate allows at most 16384`);
  }
  let data: unknown;
  try {
    data = JSON.parse(raw.toString('utf8'));
  } catch {
    fail('POST.json is not valid JSON');
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    fail('POST.json must hold one JSON object');
  }
  const url = (data as Record<string, unknown>).url;
  if (typeof url !== 'string' || url.length === 0) {
    fail('POST.json must carry a string field named "url"');
  }
  if (!POST_URL_PATTERNS.some((pattern) => pattern.test(url))) {
    fail(`"url" is not an X post address: ${url}`);
  }
  return { raw, url };
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const { raw, url } = readPostFile(join(botDir, 'POST.json'));
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, 'POST.json');
  writeFileSync(target, raw);
  // Read the copy back and compare: the grader trusts these bytes, so a
  // short or torn write must surface here rather than at the gate.
  const written = readFileSync(target);
  if (!written.equals(raw)) {
    fail(`verification failed: ${target} differs from the source POST.json`);
  }
  console.log(`copied POST.json (${raw.length} bytes) for ${url}`);
}

main();
