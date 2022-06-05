export const transform = async () => {
    // Write your code here
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

//test
transform();
//transform.js - implement function that reads data from process.stdin,
// reverses text using Transform Stream and then writes it into process.stdout