import * as fs from 'fs';
import * as path from 'path';
import { getDirname } from '../utils.js';
import * as zlib from 'zlib';
import { pipeline } from 'stream';

const __dirname = getDirname(import.meta.url);

export const compress = async (srcFile, destFile) => {
    if (!srcFile) srcFile = path.join(__dirname, 'files', 'fileToCompress.txt');
    if (!destFile) destFile = path.join(__dirname, 'files', 'archive.gz');

    const input = fs.createReadStream(srcFile);
    const output = fs.createWriteStream(destFile);
    const gzip = zlib.createGzip();
    pipeline(
        input,
        gzip,
        output,
        e => {
            if (e) {
                console.log(e);
            }
        }
    );
};

//test
compress();

//compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API