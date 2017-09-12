const russian = {
    alpha: {
        'A': ['Д'],
        'B': ['Б', 'Ъ', 'Ь'],
        'C': ['Ҫ'],
        'E': ['Ԑ', 'Є', 'Э'],
        'F': ['Ӻ', 'Ғ'],
        'H': ['Њ', 'Ҥ', 'Ӊ', 'Ң'],
        'I': ['Ї'],
        'K': ['Қ', 'Ҡ', 'Ҝ', 'Ԟ'],
        'M': ['Ԡ'],
        'N': ['И', 'Ѝ', 'Й'],
        'O': ['Ф'],
        'R': ['Я'],
        'T': ['Г', 'Ґ', 'Ҭ'],
        'U': ['Ц', 'Џ'],
        'W': ['Ш', 'Щ'],
        'X': ['Ӿ', 'Ҳ', 'Ӽ', 'Ж'],
        'Y': ['Ч', 'Ұ']
    },
    random: function (len) {
        if (len === 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function (str) {
        const strArr = str.toUpperCase().split(''),
            output = strArr.map(function (a) {
                if (!russian.alpha.hasOwnProperty(a) && a !== "R") return a;
                return russian.alpha[a][russian.random(russian.alpha[a].length)];
            });
        return output.join('');
    }
};

exports.run = (client, message, args) => {
    if (!args || args.length < 1) throw new Error('Give something to convert xd');
    message.edit(russian.generate(args.join(' ')));
};

exports.help = {
    name: 'russian',
    description: 'Generates fake russian text.',
    usage: 'russian [text]'
};