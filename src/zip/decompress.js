import * as fs from 'fs';
import * as path from 'path';
import { getDirname } from '../utils.js';
import * as zlib from 'zlib';
import { pipeline } from 'stream';

const __dirname = getDirname(import.meta.url);

export const decompress = async (srcFile, destFile) => {
    if (!srcFile) srcFile = path.join(__dirname, 'files', 'archive.gz');
    if (!destFile) destFile = path.join(__dirname, 'files', 'fileToCompress.txt');

    const input = fs.createReadStream(srcFile);
    const output = fs.createWriteStream(destFile);
    const unzip = zlib.createGunzip();
    pipeline(
        input,
        unzip,
        output,
        e => {
            if (e) {
                console.log(e);
            }
        }
    );
};

await decompress();


//decompress.js - implement function that decompresses archive.gz back
// to the fileToCompress.txt with same content as before compression using zlib and Streams API