const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('attractive', 'Attractive styles.', 'attractive'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/attractive', { images: [image] });

        message.channel.send({
            files: [{
                name: 'attractive.png',
                attachment: image
            }]
        });
    }
};