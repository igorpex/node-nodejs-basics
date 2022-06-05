import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);


export const copy = async (srcDir, destDir) => {
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
