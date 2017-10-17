const jimp = require('jimp');
const Command = require('../../command');

class VotekickCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'votekick',
            description: 'Start a votekick.',
            usage: 'votekick [text]'
        };
    }

    async run (client, message, args) {
        const user = message.author.username;

        const title = args.join(' ');
        if (title === '') throw new Error('Give it a title!');

        let image = await jimp.read('./files/votekick/votekick.png');
        const verdana = await jimp.loadFont('./files/votekick/Verdana.fnt');
        const tf2secondary = await jimp.loadFont('./files/votekick/TF2secondary.fnt');

        console.log('test');
        image.print(verdana, 10, 5, `${user} wants to call a vote:`, 1000, 1000);

        image = await client.utils.getBufferFromJimp(image);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'votekick.png'
            }]
        });
    }
}

module.exports = VotekickCommand;