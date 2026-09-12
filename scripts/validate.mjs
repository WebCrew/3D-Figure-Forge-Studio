import fs from 'node:fs';
import zlib from 'node:zlib';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function embedded(id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<script id="${escaped}"[^>]*>([\\s\\S]*?)<\\/script>`));
  if (!match) throw new Error(`Missing embedded asset: ${id}`);
  return Buffer.from(match[1].replace(/\s/g, ''), 'base64');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<title>Figure Forge Studio</title>'), 'Unexpected application title');
assert(html.includes('generator: "Figure Forge Studio"'), 'Neutral JSON generator is missing');
assert(!html.includes('__CHARACTER_'), 'An asset placeholder was not replaced');

const bodyObj = zlib.gunzipSync(embedded('characterObjData')).toString('utf8');
const hairObj = zlib.gunzipSync(embedded('hairObjData')).toString('utf8');
assert((bodyObj.match(/^v /gm) || []).length === 71235, 'Unexpected body vertex count');
assert((bodyObj.match(/^f /gm) || []).length === 73480, 'Unexpected body face count');
assert((hairObj.match(/^v /gm) || []).length === 1836, 'Unexpected hair vertex count');
assert((hairObj.match(/^f /gm) || []).length === 2543, 'Unexpected hair face count');

for (const id of [
  'bodyTextureData', 'faceTextureData', 'eyeTextureData',
  'clothTextureData', 'teethTextureData', 'hairTextureData'
]) {
  const jpeg = embedded(id);
  assert(jpeg[0] === 0xff && jpeg[1] === 0xd8, `${id} is not a valid JPEG payload`);
}

const scripts = [...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)];
assert(scripts.length >= 9, 'Expected application and embedded-asset scripts');
new Function(scripts.at(-1)[1]);

console.log('Figure Forge Studio validation passed.');
