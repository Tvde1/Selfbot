const catFacts = require('cat-facts');
const Command = require('../../command');

class CatfactCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'catfact',
            description: 'Sends a nice catfact.',
            usage: 'catfact'            
        };
    }

    async run (client, message) {
        message.EmbedEdit('🐱 Catfact:', client.utils.addDot(catFacts.random()));
    }
}

module.exports = CatfactCommand;