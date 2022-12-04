import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

const performCalculations = async () => {

    const filePath = path.join(__dirname, 'worker.js');

    const numOfCpus = os.cpus().length;
    let promises = [];

    for (let i = 0; i < numOfCpus; i++) {
        const n = 10 + i;
        const workerPromise = new Promise((resolve, reject) => {
            const worker = new Worker(filePath, { workerData: n });
            worker.on('message', msg => resolve({ status: msg.status, data: msg.data }));
            worker.on('error', () => reject({ status: 'error', data: null }));
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
        promises.push(workerPromise);
    };

    const resultsArray = (await Promise.allSettled(promises)).map(element => element.value);
    return (resultsArray);
};

await performCalculations();