#!/usr/bin/env node
const { spawnSync } = require('child_process');

const spec = process.argv[2];
if (!spec) {
  console.error('Usage: node agents/run-single.js <spec-path> [--project=chromium]');
  process.exit(2);
}

const extra = process.argv.slice(3).join(' ');
const cmd = `npx playwright test ${spec} ${extra}`.trim();

console.log(`Running single spec: ${cmd}`);
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
