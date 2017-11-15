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
            requestOptions.args.size = args[0]; //TODO: Maybe check for int.
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/pixelate', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'pixelate.png'
            }]
        });
    }
};
