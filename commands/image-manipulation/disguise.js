const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('disguise', 'Disguises people.', 'disguise'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/disguise', { images: [image] });

        message.channel.send({
            files: [
                {
                    name: 'disguise.png',
                    attachment: image
                }
            ]
        });
    }
};
