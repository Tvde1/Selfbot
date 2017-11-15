const jimp = require('jimp');
const fs = require('fs');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('hacker', 'Be a real hacker!', 'hacker [text]'));
    }

    async run(message, args) {
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

        image = await this.client.utils.getBufferFromJimp(image);

        message.channel.send({
            files: [{
                attachment: image,
                name: 'hacked.png'
            }]
        });
    }
};
