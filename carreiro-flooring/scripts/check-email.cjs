/* eslint-disable @typescript-eslint/no-require-imports */
// Exercise the real route with a mocked provider; never sends email.
const ts = require('typescript');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const assert = require('node:assert/strict');
const { NextRequest } = require('next/server');
function load(file, aliases = {}) {
  const filename = path.resolve(file);
  const mod = new Module(filename, module);
  mod.paths = module.paths;
  const original = mod.require.bind(mod);
  mod.require = name => aliases[name] || original(name);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText, filename);
  return mod.exports;
}
async function main() {
  process.env.RESEND_API_KEY = 'mock-key';
  process.env.QUOTE_FROM_EMAIL = 'mock@example.com';
  process.env.QUOTE_TO_EMAIL = 'recipient@example.com';
  const { POST } = load('app/api/quote/route.ts', { '@/lib/quote': load('lib/quote.ts') });
  const data = { name: 'Test Person', phone: '4845551234', email: 'reply@example.com', projectType: 'Stairs', message: 'A mocked request for stair installation.' };
  const request = () => new NextRequest('https://example.com/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://example.com' }, body: JSON.stringify(data) });
  global.fetch = async (url, init) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(init.body);
    assert.equal(payload.reply_to, data.email);
    assert.equal(payload.to[0], process.env.QUOTE_TO_EMAIL);
    assert.ok(payload.text.includes(data.message));
    return Response.json({ id: 'mock-accepted-id' });
  };
  const accepted = await POST(request());
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).ok, true);
  global.fetch = async () => Response.json({ error: 'Provider failure' }, { status: 500 });
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => Response.json({});
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => { throw new Error('Network failure'); };
  assert.equal((await (await POST(request())).json()).ok, false);
  console.log('Email route: mocked acceptance, provider rejection, missing confirmation and network failure passed. No email sent.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
