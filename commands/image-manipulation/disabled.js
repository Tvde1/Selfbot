const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('disabled', 'Uses the last sent image in the disabled meme.', 'disabled'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/disabled', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'disable.png'
            }]
        });
    }
};
