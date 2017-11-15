const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('b', 'Replaces all p/b/v/f/g with :b:.', 'b [text]'));
    }

    async run (message, args) {
        message.edit(args.join(' ').replace(/[pbvfg]/gi, '🅱'));
    }
};
