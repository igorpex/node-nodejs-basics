import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

/**
 * Given a file name, writes `I am fresh and young` to it.
 * @param {String} filename - should be `fresh.txt` (default) or other file name
 */

export const create = async (filename = 'fresh.txt') => {
    let newFilePath = path.join(__dirname, 'files', filename);
    const newFileContent = "I am fresh and young";

    const checkIfFileExist = async () => {
        try {
            let newFileStat = await fs.stat(newFilePath);
            if (newFileStat.isFile()) {
                throw new Error("FS operation failed - file exists");
            }
            fs.writeFile(newFilePath, newFileContent, 'utf-8');
        } catch (e) {
            if (e.code !== 'ENOENT') {
                console.log(e);
            }
        };
    };

    const writeFile = async () => {
        try {
            fs.writeFile(newFilePath, newFileContent, 'utf-8');
        } catch (e) {
            console.log('error', e);
        }
    }

    await checkIfFileExist();
    await writeFile();
}


// create.js - implement function that creates new file fresh.txt
// with content I am fresh and young inside of the files folder
// (if file already exists Error with message FS operation failed must be thrown)