import * as fs from 'fs';
import * as path from 'path';
import { getDirname } from '../utils.js';
const __dirname = getDirname(import.meta.url);

const write = async () => {

    const file = path.join(__dirname, 'files', 'fileToWrite.txt');
    const output = fs.createWriteStream(file, 'utf-8');

    const { stdin, stdout } = process;

    stdout.write('Введите текст для записи в файл. Введите "exit" или нажмите Ctrl+C для окончания записи.\n');

    stdin.on('data', chunk => {
        if (chunk.toString().trim() !== 'exit') {
            output.write(chunk);
        } else {
            handleExit();
        }
    });

    function handleExit() {
        stdout.write('\nЗапись файла окончена. Выход.\n');
        process.exit();
    }

    process.on('SIGINT', () => handleExit());  // CTRL+C
};

await write();