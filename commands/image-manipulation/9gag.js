const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('9gag', 'Adds the 9gag watermark.', '9gag'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/9gag', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: '9gag.png'
            }]
        });
    }
};
