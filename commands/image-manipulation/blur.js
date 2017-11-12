const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class BlurCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('blur', 'Blurs an image.', 'blur <no. pixels>'));
    }

    async run(message, args) {

        const r = parseInt(args[0]) || 4;

        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('blur', { images: [image]} );

        message.channel.send({
            files: [{
                attachment: image,
                name: 'blur.png'
            }]
        });
    }
}

module.exports = BlurCommand;