const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('screenshot', 'Make a screenshot of an url.', 'screenshot [url]'));
    }

    async run(message, args) {
        if (args.length === 0) {
            return new Error('You need to input a url.');}

        const url = args.join(' ');
        
        const result = await this.client.apiClient.fetchImageFromApi('other/screenshot', { args: { url } });

        message.channel.send({
            files: [{
                attachment: result,
                name: 'screenshot.png'
            }]
        });
    }
};
