const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('lmgtfy', 'For stupid questions.', 'lmgtfy [args]'));
    }

    async run(message, args) {
        if (args.length === 0) {
            args = ['how', 'to', 'add', 'arguments'];
        }
        message.edit(`<http://lmgtfy.com/?q=${args.join('+')}>`);
    }
};
