const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('pixelate', 'Pixelates an image.', 'pixelate <pixel size>'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const requestOptions = { images: [image] };
        if (args[0]) {
            const size = parseInt(args[0]);
            if (!size) {
                throw new Error('Your quality argument is not a number.');
            }
            requestOptions.args = { size };
        }

        image = await this.client.utils.fetchImageFromApi('image-manipulation/pixelate', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'pixelate.png'
            }]
        });
    }
};
