const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('reminder', 'Takes the previous image and makes a reminder with the text.', 'reminder [text]'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        if (args.length === 0) {
            throw new Error('Missing text arguments.');
        }
        let text = args.join(' ');

        const requestOptions = { images: [image], args: { text } };        

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/reminder', requestOptions);

        message.channel.send({
            files: [
                {
                    attachment: image,
                    name: 'reminder.png'
                }
            ]
        });
    }
};
