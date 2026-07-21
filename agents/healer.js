#!/usr/bin/env node
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const issue = args.join(' ') || 'build/test failure';

console.log(`Healing work for: ${issue}`);
console.log('This agent is a convenience wrapper for diagnosing and repairing issues.');
console.log('Example: node agents/healer.js "fix playwright timeouts"');

const cmd = `echo Healer agent would diagnose and fix: ${issue}`;
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
