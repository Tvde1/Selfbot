const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

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

        image = await this.client.utils.fetchFromApi('image-manipulation/hypercam', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'hypercam.png'
            }]
        });
    }
};
