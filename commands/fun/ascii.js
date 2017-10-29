const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');
const request     = require('request');

class AsciiCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('ascii', 'Edits the message with a code block with the text in ascii-art.', 'ascii [text]'));
    }

    async run (message, args) {
        if (args.length === 0) throw new Error('You need to tell me what to say...');

        request('http://artii.herokuapp.com/make?text=' + args.join(' '), (error, response, body) => {
            message.edit(body, { code: true });
        });
    }
}

module.exports = AsciiCommand;