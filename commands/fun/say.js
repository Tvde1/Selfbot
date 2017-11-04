const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

const letters = {
    'z': '🇿',
    'y': '🇾',
    'x': '🇽',
    'w': '🇼',
    'v': '🇻',
    'u': '🇺',
    'tm': '™',
    't': '🇹',
    's': '🇸',
    'r': '🇷',
    'q': '🇶',
    'p': '🇵',
    'o': '🇴',
    'n': '🇳',
    'm': '🇲',
    'l': '🇱',
    'k': '🇰',
    'j': '🇯',
    'i': '🇮',
    'h': '🇭',
    'g': '🇬',
    'f': '🇫',
    'e': '🇪',
    'd': '🇩',
    'c': '🇨',
    'b': '🇧',
    'a': '🇦',
    '?': '❔',
    '9': '9⃣',
    '8': '8⃣',
    '7': '7⃣',
    '6': '6⃣',
    '5': '5⃣',
    '4': '4⃣',
    '3': '3⃣',
    '2': '2⃣',
    '1': '1⃣',
    '0': '0⃣',
    '-': '➖',
    '+': '➕',
    '*': '*⃣',
    '#': '#⃣',
    '!': '❕',
    ' ': '⬛'
};

class SayCommand extends Command {
    constructor(client) {
        super(client, new CommandInfo('say', 'Turns the text into emoji letters.', 'say [text]'));
    }

    async run(message, args) {
        if (args.length === 0) {
            throw new Error('You need to input some text, dummy.');
        }
        
        const newText = args.join(' ').split('').map(x => letters[x.toLowerCase()] || x).join('');
        message.edit(newText);
    }
}

module.exports = SayCommand;