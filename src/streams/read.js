import * as fs from 'fs';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

export const read = async () => {
    const { stdout } = process;
    const file = path.join(__dirname, 'files', 'fileToRead.txt');
    const stream = fs.createReadStream(file, 'utf-8');

    stream.on('data', chunk => stdout.write(chunk));
    stream.on('end', () => process.exit());
};

//test
read();

// read.js - implement function that reads file fileToRead.txt content
// using Readable Stream and prints it's content into process.stdout