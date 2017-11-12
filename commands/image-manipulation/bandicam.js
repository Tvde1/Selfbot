const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class BandicamCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('bandicam', 'Adds the bandicam watermark.', 'bandicam'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.utils.fetchImageEndpointFromApi('bandicam', { images: [image] });
        
        message.channel.send({
            files: [{
                attachment: image,
                name: '9gag.png'
            }]
        });
    }
}

module.exports = BandicamCommand;