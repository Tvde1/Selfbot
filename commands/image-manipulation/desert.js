const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class DesertCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('desert', 'Water? No!', 'desert'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }
        
        image = await this.client.utils.fetchImageEndpointFromApi('desert', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'desert.png'
            }]
        });
    }
}

module.exports = DesertCommand;