const {js_beautify} = require('js-beautify');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class BeautifyCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('beautify', 'Get the last JS code block and makes it *prettier*.', 'beautify'));
    }

    async run(message) {
        await message.channel.messages.fetch({limit:100});
        const code = await this.client.utils.getCode(message.channel.messages.array());
        if (!code) throw new Error('No Javascript codeblock found.');
        const betterCode = format(code);
        message.edit(message.content + '\n==========\n' + betterCode);
    }
}

module.exports = BeautifyCommand;

const reduceIndentation = (string) => {
    let whitespace = string.match(/^(\s+)/);
    if (!whitespace) return string;

    whitespace = whitespace[0].replace('\n', '');
    return string.split('\n').map(line => line.replace(whitespace, '')).join('\n');
};

const format = (code) => {
    const beautifiedCode = js_beautify(code, {indent_size: 4, brace_style: 'collapse', jslint_happy: true});
    let str = reduceIndentation(beautifiedCode);

    str = str.replace(/{\n{2,}/gm, '{\n');
    str = str.replace(/}\n{2,}/gm, '}\n');
    str = str.replace(/\r\n/gi, '\n');

    str = str.replace(/^(\s*\r?\n){2,}/, '\n');

    return `${'```js'}\n${str}\n${'```'}`;
};