const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('clap', 'Swaps spaces with 👏 emojis.', 'clap [text]'));
    }

    async run(message, args) {
        message.edit(args.join('👏'));
    }
};
