const letters = {
    'z': '🇿',
    'y': '🇾',
    'x': '🇽',
    'wc': '🚾',
    'w': '🇼',
    'vs': '🆚',
    'v': '🇻',
    'up': '🆙',
    'u': '🇺',
    'top': '🔝',
    'tm': '™',
    't': '🇹',
    'sos': '🆘',
    'soon': '🔜',
    's': '🇸',
    'r': '🇷',
    'q': '🇶',
    'p': '🇵',
    'on': '🔛',
    'ok': '🆗',
    'o': '🇴',
    'ng': '🆖',
    'new': '🆕',
    'n': '🇳',
    'm': '🇲',
    'l': '🇱',
    'k': '🇰',
    'j': '🇯',
    'id': '🆔',
    'i': '🇮',
    'h': '🇭',
    'g': '🇬',
    'free': '🆓',
    'f': '🇫',
    'end': '🔚	',
    'e': '🇪',
    'd': '🇩',
    'cool': '🆒',
    'cl': '🆑',
    'c': '🇨',
    'back': '🔙',
    'b': '🇧',
    'atm': '🏧',
    'abcd': '🔠',
    'abc': '🔤',
    'ab': '🆎',
    'a': '🇦',
    '?': '❔',
    '9': '9⃣',
    '8': '8⃣',
    '7': '7⃣',
    '69': '♋',
    '6': '6⃣',
    '5': '5⃣',
    '4': '4⃣',
    '3': '3⃣',
    '2': '2⃣',
    '1234': '🔢',
    '100': '💯',
    '10': '🔟',
    '1': '1⃣',
    '0': '0⃣',
    '-': '➖',
    '+': '➕',
    '*': '*⃣',
    '#': '#⃣',
    '!?': '⚠',
    '!': '❕',
    '!!': '‼',
    ' ': '⬛'
};

exports.run = (client, message, args) => {
    let text = args.join(' ').toLowerCase();
    if (text === '') throw new Error('You need to input some text, dummy.');
    let replacedText = '';

    while (text.length > 0) {
        if (!letters.hasOwnProperty(text[0])) {
            replacedText += text[0];
            text = text.substring(1);
            continue;
        }
        for (const letter in letters) {
            if (text.startsWith(letter)) {
                replacedText += letters[letter] + '‌‌​';
                text = text.substring(letter.length);
                break;
            }
        }
    }

    message.edit(replacedText);
};

exports.help = {
    name: 'say',
    description: 'Turns the text into emoji letters.',
    usage: 'say [text]'
};