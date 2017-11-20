const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('jpeg', 'Needs more jpeg!', 'jpeg <% quality>'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const requestOptions = { images: [image] };
        if (args[0]) {
            const quality = parseInt(args[0]);
            if (!quality) {
                throw new Error('Your quality argument is not a number.');
            }
            requestOptions.args = { quality };
        }

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/jpeg', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'jpeg.png'
            }]
        });
    }
};
