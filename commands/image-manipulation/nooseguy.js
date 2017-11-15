const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('nooseguy', 'Puts the most recent image into the noose guy picture.', 'nooseguy'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/nooseguy', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'nooseguy.png'
            }]
        });
    }
};
