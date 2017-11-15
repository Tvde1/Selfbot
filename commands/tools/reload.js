const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('reload', 'Reloads a command that\'s been modified.', 'reload [command]'));
    }

    async run(message) {
        this.client.commandHandler.load();
        message.Success();
    }
};
