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
            requestOptions.args.amount = args[0]; //TODO: Check int
        }
        
        image = await this.client.utils.fetchFromApi('image-manipulation/sharpen', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'sharpen.png'
            }]
        });
    }
};
