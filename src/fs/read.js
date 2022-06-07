import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

/**
 * prints content of the file with `filename` into console
 * Default filename is `fileToRead.txt`, folder `files`
 * if there's no file `fileToRead.txt` Error with message `FS operation failed` is thrown)
 * @param {String} filename - should be file name in `files` directory. Default is `fileToRead.txt`
 */
export const read = async (fileName) => {
  // Write your code here 
  if (!fileName) fileName = 'fileToRead.txt';
  const subDir = 'files';
  const filePath = path.join(__dirname, subDir, fileName);

  try {
    let text = await fs.readFile(filePath, 'utf-8')
    console.log(text);
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error("FS operation failed - no such file");
    } else console.log(e);
  }
};