const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class WdtCommand extends Command {

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

        image = await this.client.utils.fetchImageEndpointFromApi('wdt', { images: [image] });

        message.channel.send({
            files: [{
                attachment: image,
                name: 'wdt.png'
            }]
        });
    }
}

module.exports = WdtCommand;