#!/usr/bin/env node
const { spawnSync } = require('child_process');

const cmd = 'npx playwright show-report';
console.log(`Opening report: ${cmd}`);
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
