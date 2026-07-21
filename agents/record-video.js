#!/usr/bin/env node
const { spawnSync } = require('child_process');

// This agent runs tests and relies on Playwright config to enable video recording.
const args = process.argv.slice(2).join(' ');
const cmd = `npx playwright test ${args}`.trim();

console.log('Note: Ensure `use.video` is enabled in playwright.config.js or set via project settings.');
console.log(`Running: ${cmd}`);
const res = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(res.status || 0);
