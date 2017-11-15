const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('rotate', 'Rotates an image', 'rotate <degrees>'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const amount = parseInt(args[0]);
        if (!amount) {
            throw new Error('Missing amount parameter.');
        }

        const requestOptions = { images: [image], args: { amount }};

        image = await this.client.utils.fetchFromApi('image-manipulation/rotate', requestOptions);

        message.channel.send({
            files: [
                {
                    name: 'rotated.png',
                    attachment: image
                }
            ]
        });
    }
};
