const Command = require('../../command');

class DelCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'del',
            description: 'Deletes an amount of messages in the channel.',
            usage: 'del [number]'
        };
    }

    async run (client, message, args) {
        if (isNaN(args[0]) || args[0] === ' ') throw new Error(`The correct syntax is ${client.config.prefix}${this.help.usage}`);
        const number = parseInt(args[0]);

        client.utils.deleteMyMessages(client, message.channel, number + 1);
    }
}

module.exports = DelCommand;