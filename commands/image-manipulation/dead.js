const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('dead', 'Minecraft death screen.', 'dead'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchFromApi('image-manipulation/dead', { images: [image]} );

        message.channel.send({
            files: [{attachment: image, name: 'Minecraft.png'}]
        });
    }
};
