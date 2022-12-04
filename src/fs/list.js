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

const list = async (directory) => {
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
      throw new Error("FS operation failed");
    } else console.log(e);
  }
};

await list();
