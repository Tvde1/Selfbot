const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class BrazzersCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('brazzers', 'Adds the brazzers logo to the bottom right of the last image.', 'brazzers'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('brazzers', { images: [image]} );

        message.channel.send({
            files: [{
                attachment: image,
                name: 'brazzers.png'
            }]
        });
    }
}

module.exports = BrazzersCommand;