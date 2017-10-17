const Command = require('../../command');

class AbortCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'abort',
            description: 'Shuts down the bot.',
            usage: 'abort'
        };
    }

    async run (client, message) {
        await message.channel.send('**FUCK I SCREWED UP. THIS IS AN AUTOMATED SHUTDOWN MESSAGE**');
        client.destroy();
        process.exit(1);
    }
}

module.exports = AbortCommand;