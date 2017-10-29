const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

const letters = {
    'z': ['🇿'],
    'y': ['🇾'],
    'x': ['🇽', '✖', '❌'],
    'wc': ['🚾'],
    'w': ['🇼'],
    'vs': ['🆚'],
    'v': ['🇻', '♈'],
    'up': ['🆙'],
    'u': ['🇺', '⛎'],
    'top': ['🔝'],
    'tm': ['™'],
    't': ['🇹', '✝', '☦'],
    'sos': ['🆘'],
    'soon': ['🔜'],
    's': ['🇸', '💲'],
    'r': ['🇷', '®'],
    'q': ['🇶'],
    'p': ['🇵', '🅿'],
    'on': ['🔛'],
    'ok': ['🆗'],
    'o': ['🇴', '⏺', '🅾', '⭕'],
    'ng': ['🆖'],
    'new': ['🆕'],
    'n': ['🇳', '♑'],
    'm': ['🇲', 'Ⓜ', '♏', '♍'],
    'l': ['🇱'],
    'k': ['🇰'],
    'j': ['🇯'],
    'id': ['🆔'],
    'i': ['🇮', 'ℹ'],
    'h': ['🇭', '♓'],
    'g': ['🇬'],
    'free': ['🆓'],
    'f': ['🇫'],
    'end': ['🔚'],
    'e': ['🇪', '3⃣', '📧'],
    'd': ['🇩'],
    'cool': ['🆒'],
    'cl': ['🆑'],
    'c': ['🇨', '©'],
    'back': ['🔙'],
    'b': ['🇧', '🅱'],
    'atm': ['🏧'],
    'abcd': ['🔠', '🔡'],
    'abc': ['🔤'],
    'ab': ['🆎'],
    'a': ['🇦', '🅰'],
    '?': ['❔', '❓'],
    '9': ['9⃣'],
    '8': ['8⃣'],
    '7': ['7⃣'],
    '69': ['♋'],
    '6': ['6⃣'],
    '5': ['5⃣'],
    '4': ['4⃣'],
    '3': ['3⃣'],
    '2': ['2⃣'],
    '1234': ['🔢'],
    '100': ['💯'],
    '10': ['🔟'],
    '1': ['1⃣'],
    '0': ['0⃣'],
    '-': ['➖'],
    '+': ['➕', '🇨🇭'],
    '*': ['*⃣', '✳'],
    '#': ['#⃣'],
    '!?': ['⚠'],
    '!': ['❕', '❗'],
    '!!': ['‼'],
    ' ': ['▪', '◾', '◼', '⬛', '⚫', '▫', '◽', '◻', '⬜', '⚪']
};

class ReactCommand extends Command {
    constructor(client) {
        super(client, new CommandInfo('react', 'React with emoji to a message.', 'react [message id] [text]'));
    }

    async run(message, args) {
        if (args.length < 2) throw new Error(`The syntax is like this: \`${this._client.config.prefix}react [message id] [react text]\`.`);
        
        let reactMessage = await message.channel.messages.fetch(args[0]);
        if (!reactMessage) throw new Error('Could not find the message specified.');
        
        let text = args.splice(1).join(' ');
        let emojiArray = [];
        
        while (text.length > 0) {
            for (let letter in letters) {
                if (!letters.hasOwnProperty(letter)) continue;
                if (text.startsWith(letter)) {
                    for (let j = 0; j < letters[letter].length; j++) {
                        if (!emojiArray.includes(letters[letter][j])) {
                            emojiArray.push(letters[letter][j]);
                            break;
                        }
                    }
                    text = text.substring(letter.length);
                }
            }
        }
        reactEmoji(emojiArray, reactMessage, 0);
        message.delete();
    }
}

module.exports = ReactCommand;

function reactEmoji(emojiArray, emojiMessage, index) {
    emojiMessage.react(emojiArray[index]).then(() => {
        if (index !== emojiArray.length - 1) reactEmoji(emojiArray, emojiMessage, index + 1);
    }).catch(() => {
        console.log(emojiArray);
    });
}

exports.ReactEmoji = (emojiArray, emojiMessage) => reactEmoji(emojiArray, emojiMessage, 0);