const { spawn } = require('child_process');
const path = require('path');
const core = require('@actions/core');

const args = core.getInput('run');
args.split("\n").forEach (arg => {

    core.info(`Executing '${arg}' ...`)
    const cmd = spawn(arg, [], {
        detached: true,
        shell: true
    });

    cmd.stdout.on('data', (data) => {
        core.info(data)
    });

    cmd.stderr.on('error', (data) => {
        core.error(data)
    });

    cmd.on('close', (code) => {
        if (code == 0) {
            core.info(`command '${arg}' exited with code: ${code}`);
        } else {
            core.error(`child process exited with code ${code} `);
            core.setFailed(`command '${arg}' failed with error code: ${code}`);
        }   
    });
})
