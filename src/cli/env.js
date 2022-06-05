const parseEnv = () => {
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
