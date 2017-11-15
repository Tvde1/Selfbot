const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('laid', 'People who get laid.', 'laid'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/laid', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'laid.png'
            }]
        });
    }
};