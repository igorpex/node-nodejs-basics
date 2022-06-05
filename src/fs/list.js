// import * as fs from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

/**
 * prints all array of filenames 
* from files folder into console 
* (if files folder doesn't exists Error with message `FS operation failed` is thrown)
 * @param {String} directory - should be directry(subfolder) name. Default is `files`
 */

export const list = async (directory) => {
  if (!directory) directory = 'files';
  const dirPath = path.join(__dirname, directory);
  try {
    const list = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const files = list
      .filter(dirent => dirent.isFile())
      .map(file => file.name);
    console.log('files array: ', files)
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error("FS operation failed - no such directory");
    } else console.log(e);
  }
};

/**
 * prints all array of filenames 
* from files folder into console with SIZES
* (if files folder doesn't exists Error with message `FS operation failed` is thrown)
 * @param {String} directory - should be directry(subfolder) name. Default is `files`
 */
export const listWithSizes = async (directory) => {
  if (!directory) directory = 'files';
  const dirPath = path.join(__dirname, directory);
  try {
    const list = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const files = list.filter(dirent => dirent.isFile());
    for (let file of files) {
      const fileName = file['name'];
      // const fileBaseName = path.basename(fileName, path.extname(fileName));
      const fileBaseName = path.parse(fileName).name;
      // const fileExt = path.parse(fileName).ext; //.csv
      const ext = path.extname(fileName).slice(1);
      const filePath = path.join(__dirname, directory, fileName);
      fs.stat(filePath, (err, stats) => {
        console.log(fileBaseName, '-', ext, '-', (stats.size / 1024).toFixed(3) + 'kb');
      });
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error("FS operation failed - no such directory");
    } else console.log(e);
  }
};

list();

/* 
list.js - implement function that prints all array of filenames 
from files folder into console 
(if files folder doesn't exists Error with message FS operation failed must be thrown)
*/