const Command = require('../../command');

class ClapCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'clap',
            description: 'Swaps spaces with 👏 emojis.',
            usage: 'clap [text]'
        };
    }

    async run (client, message, args) {
        message.edit(args.join('👏'));
    }
}

module.exports = ClapCommand;