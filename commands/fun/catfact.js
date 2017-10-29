const CommandInfo = require('../../templates/commandInfo');
const catFacts    = require('cat-facts');
const Command     = require('../../templates/command');

class CatfactCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('catfact', 'Sends a nice catfact.', 'catfact'));
    }

    async run (message) {
        message.EmbedEdit('🐱 Catfact:', this.client.utils.addDot(catFacts.random()));
    }
}

module.exports = CatfactCommand;