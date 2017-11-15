const eyesList = ['big', 'blood', 'blue', 'googly', 'green', 'horror', 'illuminati', 'money', 'normal', 'pink', 'red', 'small', 'spongebob', 'yellow'];
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('eyes', 'Adds funny eyes to the last sent image.', `eyes [${eyesList.join(' | ')}]`));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        const requestOptions = { images: [image] };
        if (args[0]) {
            requestOptions.args = { eye: args[0] };
        }

        image = await this.client.utils.fetchImageFromApi('image-manipulation/eyes', requestOptions);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'eyes.png'
            }]
        });
    }
};
