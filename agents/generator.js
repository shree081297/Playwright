#!/usr/bin/env node
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const target = args.join(' ') || 'test script';

console.log(`Generating artifacts for: ${target}`);
console.log('This agent is a convenience wrapper for scripted generation tasks.');
console.log('Example: node agents/generator.js "saucedemo login test"');

const cmd = `echo Generator agent would create: ${target}`;
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
