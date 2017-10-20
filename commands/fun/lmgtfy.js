const Command = require('../../command');

class LmgtfyCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'lmgtfy',
            description: 'For stupid questions.',
            usage: 'lmgtfy [args]'
        };
    }

    async run (client, message, args) {
        if (args.length === 0) args = ['how', 'to', 'add', 'arguments'];
        message.edit(`<http://lmgtfy.com/?q${args.join('+')}>`);
    }
}

module.exports = LmgtfyCommand;