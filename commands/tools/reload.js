const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class ReloadCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('reload', 'Reloads a command that\'s been modified.', 'reload [command]'));
    }

    async run(message) {
        this.client.commands.load();
        message.EmbedEdit('Done!', 'All commands reloaded.');
    }
}

module.exports = ReloadCommand;