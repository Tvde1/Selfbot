const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('abort', 'Shuts down the bot.', 'abort'));
    }

    async run(message) {
        await message.channel.send('**FUCK I SCREWED UP. THIS IS AN AUTOMATED SHUTDOWN MESSAGE**');
        this.client.destroy();
        process.exit(1);
    }
};
