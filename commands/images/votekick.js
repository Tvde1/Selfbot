const jimp = require('jimp');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('votekick', 'Start a votekick.', 'votekick [text]'));
    }

    async run(message, args) {
        const user = message.author.username;

        const title = args.join(' ');
        if (title === '') throw new Error('Give it a title!');

        let image = await jimp.read('./files/votekick/votekick.png');
        const verdana = await jimp.loadFont('./files/votekick/Verdana.fnt');
        const tf2secondary = await jimp.loadFont('./files/votekick/TF2secondary.fnt');

        console.log('test');
        image.print(verdana, 10, 5, `${user} wants to call a vote:`, 1000, 1000);

        image = await this.client.utils.getBufferFromJimp(image);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'votekick.png'
            }]
        });
    }
};
