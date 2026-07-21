#!/usr/bin/env node
const { spawnSync } = require('child_process');

const args = process.argv.slice(2).join(' ');
const cmd = `npx playwright test ${args}`.trim();

console.log(`Running: ${cmd}`);
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
