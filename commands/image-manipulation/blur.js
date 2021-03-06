const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('blur', 'Blurs an image.', 'blur <no. pixels>'));
    }

    async run(message, args) {

        const r = parseInt(args[0]) || 4;

        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/blur', { images: [image], args: { radius: r }} );

        message.channel.send({
            files: [{
                attachment: image,
                name: 'blur.png'
            }]
        });
    }
};