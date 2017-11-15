const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('stock', 'Gives an image a stock image overlay.', 'stock'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/stock', { images: [image] });

        message.channel.send({
            files:
            [{
                attachment: image,
                name: 'stock.png'
            }]
        });
    }
};
