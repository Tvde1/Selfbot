const Command = require('../../command');

class ReloadCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'reload',
            description: 'Reloads a command that\'s been modified.',
            usage: 'reload [command]'
        };
    }

    async run (client, message) {
        client.commands.load();
        message.EmbedEdit('Done!', 'All commands reloaded.');
    }
}

module.exports = ReloadCommand;