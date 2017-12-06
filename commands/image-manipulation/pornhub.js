const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('pornhub', 'Sets the last sent image in a pornhub video with the selected title.', 'pornhub [title]'));
    }

    async run(message, args) {
        const title = args.join(' ');
        if (title === '') {
            throw new Error('You need to give it a title.');
        }

        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const requestOptions = { images: [image], args: { 'title': title } };        

        image = await this.client.apiClient.fetchImageFromApi('image-manipulation/pornhub', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'pornhub.png'
            }]
        });
    }
};
