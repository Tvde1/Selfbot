const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class AbortCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('abort', 'Shuts down the bot.', 'abort'));
    }

    async run (client, message) {
        await message.channel.send('**FUCK I SCREWED UP. THIS IS AN AUTOMATED SHUTDOWN MESSAGE**');
        this.client.destroy();
        process.exit(1);
    }
}

module.exports = AbortCommand;