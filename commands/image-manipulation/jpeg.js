const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('jpeg', 'Needs more jpeg!', 'jpeg <% quality>'));
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
            requestOptions.args.quality = args[0]; //TODO: Check for numbers
        }

        image = await this.client.utils.fetchImageFromApi('image-manipulation/jpeg', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'jpeg.png'
            }]
        });
    }
};
