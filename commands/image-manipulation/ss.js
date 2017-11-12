const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class SsCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('ss', 'Puts an image into a screenshot.', 'ss'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('ss', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'screenshot.png'
            }]
        });
    }
}

module.exports = SsCommand;