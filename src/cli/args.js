const parseArgs = () => {
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