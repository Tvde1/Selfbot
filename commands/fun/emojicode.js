const { js_beautify } = require('js-beautify');
const emojify         = require('emojify');
const Command = require('../../command');

class EmojiCodeCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'emojicode',
            description: 'Get the last JS code block and makes it *readable*',
            usage: 'emojicode'
        };
    }

    async run (client, message) {
        await message.channel.messages.fetch({limit:100});
        let code = await client.utils.getCode(message.channel.messages.array());
        if (!code) throw new Error('No Javascript codeblock found.');

        code = emojify.minify(code, {fromString: true}).code;
        code = format(code);

        const emojiRegex = /([\w?])((?:[\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|(?:\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6]|\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])))/gi;
        code = code.replace(emojiRegex, '$1 $2');

        message.edit(message.content + '\n==========\n' + code);
    }
}

module.exports = EmojiCodeCommand;

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

    return (`${'```js'}\n${str}\n${'```'}`);
};
