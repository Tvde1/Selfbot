const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class PicklerickCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('picklerick', 'PICKLE RIIIICK.', 'picklerick'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('picklerick', { images: [image] });

        message.channel.send({
            files: [
                {
                    name: 'picklerick.png',
                    attachment: image
                }
            ]
        });
    }
}

module.exports = PicklerickCommand;