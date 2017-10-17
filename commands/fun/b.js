const Command = require('../../command');

class BCommand extends Command {

    constructor() {
        super();
 
        this.help = {   
            name: 'b',
            description: 'Replaces all p/b/v/f/g with :b:.',
            usage: 'b [text]'
        };
    }

    async run (client, message, args) {
        message.edit(args.join(' ').replace(/[pbvfg]/gi, '🅱'));
    }
}

module.exports = BCommand;