const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('watchmojo', 'Takes the last image and adds this text in a watchmojo video.', 'watchmojo [text]'));
    }

    async run(message, args) {
        if (args.length === 0) {
            throw new Error('Missing title argument');
        }
        const title = args.join(' ');

        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const requestOptions = { images: [image], args: { 'title': title } };        
        
        image = await this.client.utils.fetchImageFromApi('image-manipulation/pornhub', requestOptions);
                
        message.channel.send({
            files: [
                {
                    attachment: image,
                    name: 'watchmojo.png'
                }
            ]
        });
    }
};
