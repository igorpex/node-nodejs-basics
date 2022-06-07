
import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

export const remove = async (filename) => {
    // Write your code here 
    if (!filename) filename = 'fileToRemove.txt';
    const filePath = path.join(__dirname, 'files', filename);
    try {
        await fs.rm(filePath);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error("FS operation failed - no such file");
        }
    }
};