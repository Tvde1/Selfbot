const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class DeepfryCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('deepfry', 'Deep fries an image.', 'deepfry'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('deepfry', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'deepfry.png'
            }]
        });
    }
}

module.exports = DeepfryCommand;