const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('captionbot', 'Captions an image.', 'captionbot <image>'));
    }

    async run(message, args) {
        let image = await this.client.utils.getImagesFromMessage(message, args);
        if (!image) throw new Error('Could not find an image in the last 100 messages.');

        try {
            const result = await this.client.utils.fetchFromApi('other/captionbot', { images: [image] });
            message.EmbedEdit('🤖 Result:', this.client.utils.addDot(result.result));
        } catch (err) {
            message.fail();
        }
    }
};
