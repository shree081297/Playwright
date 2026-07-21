#!/usr/bin/env node
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const planTarget = args.join(' ') || 'project';

console.log(`Planning work for: ${planTarget}`);
console.log('This agent is a convenience wrapper for project planning tasks.');
console.log('Use a task summary or area to generate a plan.');
console.log('Example: node agents/planner.js "create regression suite"');

const cmd = `echo Planner agent would generate a task plan for: ${planTarget}`;
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
