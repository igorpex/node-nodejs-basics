import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

/**
* copy.js - copies folder `srcDir` with all its content into folder `destDir`.
* Defeult `srcDir` is `files` and `destDir` is `files_copy`.
* If `srcDir` folder doesn't exists or `destDir` has already been created
* Error with message `FS operation failed` is thrown
 * @param {String} srcDir - should be source subdirectry(subfolder) name. Default is `files`
 * @param {String} destDir - should be destination subdirectry(subfolder) name. Default is `files-copy`
 */
export const copy = async (srcDir, destDir) => {
  // Write your code here 
  if (!srcDir) srcDir = path.join(__dirname, 'files');
  if (!destDir) destDir = path.join(__dirname, 'files-copy');

  const checkDirsExist = async () => {

    try {
      let srcStat = await fs.stat(srcDir);
      if (!srcStat.isDirectory()) {
        throw new Error("FS operation failed - no src directory");
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new Error("FS operation failed - no src directory");
      }
    }

    try {
      let destStat = await fs.stat(destDir);
      if (destStat.isDirectory()) {
        throw new Error("FS operation failed - dest directory exists")
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        // console.log('Error', e);
      } else {
        throw new Error("FS operation failed - dest directory exists");
      }
    }

  }

  const copyDir = async () => {
    try {
      fs.cp(srcDir, destDir, {
        recursive: true,
        preserveTimestamps: true,
        // force: false,
      });
    } catch (e) {
      console.log(e);
    }

  }
  await checkDirsExist();
  copyDir();
};

/**
* copyAlternate - alternate way to copy dir with subdirs without using fs/promises.cp()
 * @param {String} srcDir - should be source subdirectry(subfolder) name. Default is `files`
 * @param {String} destDir - should be destination subdirectry(subfolder) name. Default is `files-copy`
 */
export const copyAlternate = async (srcDir, destDir) => {
  // Write your code here 
  if (!srcDir) srcDir = path.join(__dirname, 'files');
  if (!destDir) destDir = path.join(__dirname, 'files-copy');
  const copyDir = async (srcDir, destDir) => {

    const checkDirsExist = async () => {

      try {
        let srcStat = await fs.stat(srcDir);
        if (!srcStat.isDirectory()) {
          throw new Error("FS operation failed - no src directory");
        }
      } catch (e) {
        if (e.code === 'ENOENT') {
          throw new Error("FS operation failed - no src directory");
        }
      }

      try {
        let destStat = await fs.stat(destDir);
        if (destStat.isDirectory()) {
          throw new Error("FS operation failed - dest directory exists")
        }
      } catch (e) {
        if (e.code === 'ENOENT') {
          // console.log('Error', e);
        } else {
          throw new Error("FS operation failed - dest directory exists");
        }
      }

    }

    const deleteOldDest = async () => {
      try {
        await fs.rm(destDir, { recursive: true });
      } catch (e) {
        // console.log('all good');
      }
    };

    const createFolder = async () => {
      fs.mkdir(destDir, { recursive: true }, err => {
        if (err) throw err;
        // console.log('New dest folder created');
      });
    };

    const getSrcObjects = async () => {
      const srcDirFiles = await fs.readdir(srcDir, { withFileTypes: true });
      return srcDirFiles;
    };

    const copyObjects = async (srcObjects) => {
      srcObjects.forEach(obj => {
        if (obj.isFile()) {
          const srcFile = path.join(srcDir, obj.name);
          const destFile = path.join(destDir, obj.name);
          fs.copyFile(srcFile, destFile);
        }
        if (!obj.isFile()) {
          const subSrcDir = path.join(srcDir, obj.name);
          const subDestDir = path.join(destDir, obj.name);
          copyDir(subSrcDir, subDestDir);
        }
      });
    };

    await checkDirsExist();
    await deleteOldDest();
    await createFolder();
    const srcObjects = await getSrcObjects();
    copyObjects(srcObjects);
  };
  copyDir(srcDir, destDir);
};

//test
copy();