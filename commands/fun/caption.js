const CommandInfo = require('../../templates/commandInfo');
const captionbot  = require('../../helpers/captionbot');
const Command     = require('../../templates/command');

class CaptionCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('caption', 'Captions an image.', 'caption <image>'));
    }

    async run(message, args) {
        let image = await this.client.utils.getImagesFromMessage(message, args);
        if (!image) throw new Error('Could not find an image in the last 100 messages.');

        captionbot(image, (err, result) => {
            if (err) throw err;
            message.EmbedEdit('🤖 Result:', this.client.utils.addDot(result));
        });
    }
}

module.exports = CaptionCommand;