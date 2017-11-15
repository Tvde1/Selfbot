const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('wdt', '😂😂😂 who did this 😂😂😂', 'wdt'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageFromApi('image-manipulation/wdt', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'wdt.png'
            }]
        });
    }
};
