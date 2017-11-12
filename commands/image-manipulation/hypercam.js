const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class HypercamCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('hypercam', 'Adds \'Unregistered Hypercam\' to the last image.', 'hypercam'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('hypercam', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'hypercam.png'
            }]
        });
    }
}

module.exports = HypercamCommand;