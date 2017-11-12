const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class SprayCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('imadethis', 'I made this.', 'imadethis'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('imadethis', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'imadethis.png'
            }]
        });
    }
}

module.exports = SprayCommand;