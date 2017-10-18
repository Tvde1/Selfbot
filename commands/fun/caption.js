const captionbot = require('../../tools/captionbot.js');
const Command = require('../../command');

class CaptionCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'caption',
            description: 'Captions an image.',
            usage: 'caption <image>'
        };
    }

    async run (client, message, args) {
        let image = await client.utils.getImagesFromMessage(message, args);
        if (!image) throw new Error('Could not find an image in the last 100 messages.');

        captionbot(image, (err, result) => {
            if (err) throw err;
            message.EmbedEdit('🤖 Result:', client.utils.addDot(result));
        });
    }
}

module.exports = CaptionCommand;