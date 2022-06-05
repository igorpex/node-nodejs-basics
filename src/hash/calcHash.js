import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

/**
 * calculates SHA256 hash for the given file and return it as hex
 * @param {String} fileName - should be filename in `files` subfolder. Default is `fileToCalculateHashFor.txt`
 */
const calculateHash = async (fileName) => {
    if (!fileName) fileName = 'fileToCalculateHashFor.txt';
    const filePath = path.join(__dirname, 'files', fileName);
    try {
        const fileBuffer = await fs.readFile(filePath);
        const hash = crypto.createHash('sha256');
        hash.update(fileBuffer);
        const hexHash = hash.digest('hex');
        return hexHash;
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error("FS operation failed - file not found");
        } else {
            console.log(e);
        }
    }
};

await calculateHash();
