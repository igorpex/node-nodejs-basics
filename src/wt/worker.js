// n should be received from main thread
import { workerData, parentPort } from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (status, data, n) => {
    // This function sends result of nthFibonacci computations to main thread
    parentPort.postMessage({
        status: status,
        data: data,
        n: n
    });
};

let n = workerData;
let fibo = await nthFibonacci(n);
let status;
if (fibo) {
    status = 'resolved'
} else {
    status = 'error'
    fibo = null
}

sendResult(status, fibo, n);
