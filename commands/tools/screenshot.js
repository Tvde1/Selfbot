const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('screenshot', 'Make a screenshot of an url.', 'screenshot [url]'));
    }

    async run(message, args) {
        if (args.length === 0) return new Error('You need to input an url.');
        const url = args.join(' ');

        const result = await this.client.utils.fetchImageFromApi('other/screenshot', { args: { url } });

        message.channel.send({
            files: [{
                attachment: result,
                name: 'screenshot.png'
            }]
        });
    }
};
