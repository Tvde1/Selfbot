const Command = require('../../command');

class EmbedCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'embed',
            description: 'Embeds text.',
            usage: 'embed [text]'
        };
    }

    async run (client, message, args) {
        message.EmbedEdit(null, args.join(' '));
    }
}

module.exports = EmbedCommand;