const { spawn } = require('child_process');
const path = require('path');
const core = require('@actions/core');

const args = core.getInput('run');

core.debug(`Waiting ${args} args ...`)

const ls = spawn('/usr/bin/sleep', [2], {
  detached: true
});

ls.stdout.on('data', (data) => {
console.log(`stdout: ${data} ${process.argv}`);
});

ls.stderr.on('data', (data) => {
console.error(`stderr: ${data} ${process.argv}`);
});

ls.on('close', (code) => {
console.log(`child process exited with code ${code} |  ${process.argv}`);
});
