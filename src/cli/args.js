export const parseArgs = () => {
    const args = process.argv.slice(2);

    // prepate props object
    let props = {};
    args.forEach((element, index, array) => {
        if (element.startsWith('--')) {
            const propName = element.slice(2);
            const propValue = array[index + 1];
            props[propName] = propValue;
        }
    })

    // prepare string and print it
    let textArr = [];
    for (let propName in props) {
        let text = `${propName} is ${props[propName]}`
        textArr.push(text);
    }
    console.log(textArr.join(', '));
};

parseArgs();
//args.js - implement function that parses command line arguments
// (given in format --propName value --prop2Name value2, you don't need to validate it)
// and prints them to the console in the format propName is value, prop2Name is value2

// test: node .\src\cli\args.js --propName value --prop2Name value2
