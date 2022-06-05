import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

const rename = async (oldFilename, newFilename) => {
    // Write your code here

    if (!oldFilename) oldFilename = 'wrongFilename.txt';
    if (!newFilename) newFilename = 'properFilename.md';

    const oldFilepath = path.join(__dirname, 'files', oldFilename);
    const newFilepath = path.join(__dirname, 'files', newFilename);

    const checkNewExist = async () => {
        try {
            let newFileStat = await fs.stat(newFilepath);
            if (newFileStat.isFile()) {
                throw new Error("FS operation failed - new Filename already exists");
            }
        } catch (e) {
            if (e.code !== 'ENOENT') {
                console.log(e);
            } else throw e
        };
    };

    const checkOldExist = async () => {
        try {
            let newFileStat = await fs.stat(oldFilepath);
            if (newFileStat.isFile()) {
                return true
            }
        } catch (e) {
            if (e.code === 'ENOENT') {
                throw new Error("FS operation failed - old filename do not exists");
            }
        };
    };

    const renameFile = async () => {
        try {
            fs.rename(oldFilepath, newFilepath);
        } catch (e) {
            console.log('error', e);
        }
    }

    await checkNewExist();
    await checkOldExist();
    await renameFile();
};

await rename();
