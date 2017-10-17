const jimp = require('jimp');
const fs = require('fs');
const Command = require('../../command');

class HackerCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'hacker',
            description: 'Be a real hacker!',
            usage: 'hacker [text]'
        };
    }

    async run (client, message, args) {
        if (args.length === 0) {
            const invalidArgsImg = fs.readFileSync('./files/hacker/invalidargs.png');

            message.channel.send({
                files: [{
                    attachment: invalidArgsImg,
                    name: 'hacked.png'
                }]
            });
            return;
        }

        let image = await jimp.read('./files/hacker/raw.png');
        const font = await jimp.loadFont('./files/hacker/ubuntu.fnt');
        const stuff = message.content.substring(message.content.indexOf(args[0]));
        const text = stuff.substring(0, 32 * 15).replace(/(^\s+|\s+$)/g, '');

        text.match(/.{1,32}/g).forEach((part, ln) => {
            if (ln > 15) return;
            image.print(font, 220, (260 + 12 * ln), part.replace(/^[^\S\x0a\x0d]+/, ''));
        });

        image = await client.utils.getBufferFromJimp(image);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'hacked.png'
            }]
        });
    }
}

module.exports = HackerCommand;