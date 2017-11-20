const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('sciencegonetoofar', 'Has science gone too far?', 'sciencegonetoofar'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/hassciencegonetoofar', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'hassciencegonetoofar.png'
            }]
        });
    }
};