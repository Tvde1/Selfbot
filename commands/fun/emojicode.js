const {js_beautify} = require("js-beautify");


exports.run = async (client, msg) => {
    const code = await getCode(msg.channel);
    if (!code) throw new Error('No Javascript codeblock found.');
    const betterCode = format(code);
    msg.edit(msg.content + '\n==========\n' + betterCode);
};

exports.help = {
    name: 'emojicode',
    description: 'Get the last JS code block and makes it *readable*',
    usage: 'emojicode'
};

const reduceIndentation = (string) => {
    let whitespace = string.match(/^(\s+)/);
    if (!whitespace) return string;

    whitespace = whitespace[0].replace("\n", "");
    return string.split("\n").map(line => line.replace(whitespace, "")).join("\n");
};

const format = (code) => {
    const beautifiedCode = js_beautify(code, {indent_size: 4, brace_style: "collapse", jslint_happy: true});
    let str = reduceIndentation(beautifiedCode);

    str = str.replace(/{\n{2,}/gm, '{\n');
    str = str.replace(/}\n{2,}/gm, '}\n');
    str = str.replace(/\r\n/gi, '\n');

    str = str.replace(/^(\s*\r?\n){2,}/, '\n');

    return (`${"```js"}\n${str}\n${"```"}`);
};
