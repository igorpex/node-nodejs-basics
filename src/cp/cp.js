import path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);
import { fork } from 'child_process';

const spawnChildProcess = async (args) => {
    const filePath = path.join(__dirname, 'files', 'script.js');
    const child = fork(filePath, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    child.stdout.on('data',
        (data) => {
            console.info(`Received from child process: "${data.toString().trim()}"`);
        })
};

// test
// from command line: "node cp.js --one --two" or node ./src/cp/cp.js --one --two
// from script: "npm run cp"
const args = process.argv.slice(2);
spawnChildProcess(args);
