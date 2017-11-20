const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('sharpen', 'Sharpens an image.', 'sharpen <amount 1-100>'));
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
            const amount = parseInt(args[0]);
            if (!amount) {
                throw new Error('Your amount argument is not a number');
            }
            requestOptions.args = { amount };
        }
        
        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/sharpen', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'sharpen.png'
            }]
        });
    }
};
