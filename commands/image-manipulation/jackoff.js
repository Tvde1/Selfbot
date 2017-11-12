const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class JackoffCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('jackoff', 'Creates a \'jack off to this\' meme from the last sent image.', 'jackoff'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('jackoff', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'jackoff.png'
            }]
        });
    }
}

module.exports = JackoffCommand;