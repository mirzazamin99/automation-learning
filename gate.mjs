import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const proof = JSON.parse(readFileSync('proof.json', 'utf8'));

const ROOTS = ['test', 'app', 'lib', 'content.json'];
const EXTS = ['.md', '.js', '.jsx', '.json'];

// test/known-bad.md is a fixture that demonstrates copy the gate must
// reject. It is meant to fail, so it is not part of the live gate.
const EXCLUDE = ['test/known-bad.md'];

const BANNED_WORDS = ['transform', 'journey', 'unlock', 'empower', 'mindset', 'hustle', 'holistic', 'wellness', 'elevate', 'manifest'];

let failures = [];

function walk(p, out = []) {
  if (statSync(p).isFile()) { out.push(p); return out; }
  for (const f of readdirSync(p)) {
    if (f === 'node_modules' || f.startsWith('.')) continue;
    walk(join(p, f), out);
  }
  return out;
}

const files = ROOTS.flatMap(r => { try { return walk(r); } catch { return []; } })
  .filter(f => EXTS.includes(extname(f)))
  .filter(f => !EXCLUDE.includes(f));

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = s => new RegExp(`(?<![\\w-])${esc(s)}(?![\\w-])`, 'gi');

// content.json documents its own banned words (brand.bannedWords,
// brand.neverUse) as data, so it will always contain them. Find those
// two array's character ranges so matches inside them don't count as
// the copy actually using a banned word.
function selfReferenceRanges(text, filePath) {
  if (filePath !== 'content.json') return [];
  const ranges = [];
  for (const key of ['"bannedWords"', '"neverUse"']) {
    const keyIndex = text.indexOf(key);
    if (keyIndex === -1) continue;
    const bracketStart = text.indexOf('[', keyIndex);
    const bracketEnd = text.indexOf(']', bracketStart);
    if (bracketStart !== -1 && bracketEnd !== -1) ranges.push([bracketStart, bracketEnd]);
  }
  return ranges;
}

const insideRanges = (index, ranges) => ranges.some(([start, end]) => index >= start && index <= end);

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const exemptRanges = selfReferenceRanges(text, file);

  for (const [key, entry] of Object.entries(proof)) {
    if (key === 'openQuestions') continue;
    for (const phrase of entry.neverSay || []) {
      if (word(phrase).test(text)) failures.push(file + ': banned phrasing "' + phrase + '"');
    }
  }

  for (const [key, entry] of Object.entries(proof)) {
    if (key === 'openQuestions' || entry.value == null) continue;
    const v = String(entry.value);
    const required = entry.requires || [];
    if (!required.length) continue;
    for (const m of text.matchAll(word(v))) {
      const near = text.slice(Math.max(0, m.index - 300), m.index + v.length + 300).toLowerCase();
      const missing = required.filter(r => !near.includes(r.toLowerCase()));
      if (missing.length) failures.push(file + ': figure "' + v + '" missing ' + missing.join(', '));
    }
  }

  for (const w of BANNED_WORDS) {
    for (const m of text.matchAll(word(w))) {
      if (insideRanges(m.index, exemptRanges)) continue;
      failures.push(file + ': banned word "' + w + '"');
      break;
    }
  }
  if (/—/.test(text)) failures.push(file + ': em dash');
}

if (failures.length) {
  console.error('GATE FAILED - ' + failures.length + ' problem(s)');
  failures.forEach(f => console.error('  ' + f));
  process.exit(1);
}
console.log('Gate passed. ' + files.length + ' files checked.');
