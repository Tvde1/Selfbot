const wrap = require('wordwrap');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('table', 'Makes a table.', '[title]<|[text]<|[width]>>'));
    }

    async run(message, args) {
        if (args.length === 0) return this.client.EmbedEdit(message, 'Error', 'Needs atleast one argument.');
        const newArgs = args.join(' ').split('|');

        let res = {};

        /*
        Arg[0]: Message,
        Arg[1]: Title,
        Arg[2]: Width,
        Arg[3]: softCorners
        */

        let skipper = 'skip';

        if (newArgs[0] !== undefined && newArgs[0] !== skipper) res.message = newArgs[0];
        if (newArgs[1] !== undefined && newArgs[1] !== skipper) res.title = newArgs[1];
        if (newArgs[2] !== undefined && newArgs[2] !== skipper) res.width = parseInt(newArgs[2]);

        message.edit(`\`\`\`\n${prettyfy(res)}\`\`\``);
    }
};

// ReSharper disable once InconsistentNaming
const _default = {
    width: 25, // Prefered width if width is not defined
    title: 'skip', // having the title as Int(0) will skip titlebar
    message: 'skip', // Default message if message is not set
    soft: true // if false it will not have rounded corners.
};

const prettyfy = (s) => {
    let result = '';
    let i;

    if (typeof s === 'object') {
        if (s.width === undefined) s.width = _default.width;
        if (s.title === undefined) s.title = _default.title;
        if (s.message === undefined) s.message = _default.message;
        if (s.soft === undefined) s.soft = _default.soft;
    }

    else if (typeof s === 'string') {
        s = {
            width: _default.width,
            title: _default.title,
            message: s,
            soft: _default.soft
        };
    }

    s.width += 1;
    const _ = {
        title: wrap(0, s.width, {mode: 'hard'})(s.title).split('\n'),
        msg: wrap(0, s.width, {mode: 'hard'})(s.message).split('\n'),

        corners: {
            soft: ['╭', '╮', '╰', '╯']
        },

        l: ['─', '│', '├', '┤'],

        c: []
    };

    _.c = _.corners.soft;
    /* Line: 2 aka Title */
    if (s.title !== 'skip') {
        /* Line: 1 aka Start */
        result += _.c[0] + _.l[0]; // Beginning: +-
        for (i = 0; i < s.width; i++) result += _.l[0]; // Center: --
        result += _.l[0] + _.c[1] + '\n'; // End: -+

        for (let t = 0; t < _.title.length; t++) {
            result += _.l[1] + ' '; // Beginning: |\
            for (i = 0; i < (s.width / 2) - (_.title[t].length / 2); i++) result += ' '; // Center: \
            result += _.title[t]; // Center: Message
            for (i = 0.5; i < (s.width / 2) + (-_.title[t].length / 2); i++) result += ' '; // Center: \
            result += ' ' + _.l[1] + '\n'; // End: \|
        }

        if (s.message !== 'skip') {
            /* Line: 3 aka Title_Split */
            result += _.l[2] + _.l[0]; // Beginning: |-
            for (i = 0; i < s.width; i++) result += _.l[0]; // Center: --
            result += _.l[0] + _.l[3] + '\n'; // End: -|
        } else {
            /* Line 5 aka End */
            result += _.c[2] + _.l[0]; // Beginning: +-
            for (i = 0; i < s.width; i++) result += _.l[0];
            result += _.l[0] + _.c[3] + '\n'; // End: -+
        }
    }

    /* Line: 4 aka Message */
    if (s.message !== 'skip') {
        if (s.title === 'skip') {
            /* Line: 1 aka Start */
            result += _.c[0] + _.l[0]; // Beginning: +-
            for (i = 0; i < s.width; i++) result += _.l[0]; // Center: --
            result += _.l[0] + _.c[1] + '\n'; // End: -+
        }

        for (let c = 0; c < _.msg.length; c++) {
            result += _.l[1] + ' '; // Beginning: |\
            result += _.msg[c]; // Center: Message
            for (i = 0; i < s.width - _.msg[c].length; i++) result += ' '; // Center: \
            result += ` ${_.l[1]}\n`; // End: \|
        }

        /* Line 5 aka End */
        result += _.c[2] + _.l[0]; // Beginning: +-
        for (i = 0; i < s.width; i++) result += _.l[0];
        result += _.l[0] + _.c[3] + '\n'; // End: -+
    }

    if (result === '') result = ' ';

    // End;
    return result;
};