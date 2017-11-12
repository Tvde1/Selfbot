const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class UberCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('uber', 'Where tf my uber driver takin me to?.', 'uber'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('uber', { images: [image] });

        message.channel.send({
            files: [
                {
                    attachment: image,
                    name: 'uber.png'
                }
            ]
        });
    }
}

module.exports = UberCommand;