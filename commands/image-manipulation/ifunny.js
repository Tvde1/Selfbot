const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('ifunny', 'Adds the ifunny logo to the last sent image.', 'ifunny'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/ifunny', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'ifunny.png'
            }]
        });
    }
};
