const transform = async () => {
    const { stdin, stdout } = process;

    stdout.write('Введите текст для трансформации. Введите "exit" или нажмите Ctrl+C для окончания.\n');

    stdin.on('data', chunk => {
        if (chunk.toString().trim() !== 'exit') {
            const transformedChunk = chunk.toString().trim().split('').reverse().join('');
            stdout.write(transformedChunk + '\n');
            stdout.write('Еще введите текст для трансформации. Введите "exit" или нажмите Ctrl+C для окончания.\n');

        } else {
            handleExit();
        }
    });

    function handleExit() {
        stdout.write('\nТрансформация строк окончена. Выход.\n');
        process.exit();
    }

    process.on('SIGINT', () => handleExit());  // CTRL+C
};

await transform();