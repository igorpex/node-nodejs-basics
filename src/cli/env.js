export const parseEnv = () => {
    const env = process.env;
    const rssArr = [];
    for (let key in env) {
        if (key.startsWith('RSS_')) {
            rssArr.push(`${key}=${env[key]}`);
        }
    }
    console.log(rssArr.join('; '));
}
parseEnv();

//env.js - implement function that parses environment
// variables with prefix RSS_ and prints them to the console
// in the format RSS_name1=value1; RSS_name2=value2

// for bash test use: RSS_name1=value1 RSS_name2=value2 node src/cli/env
// for windows test use: $env:RSS_name1='value1'; $env:RSS_name2='value2'; node .\src\cli\env.js