const { MessageEmbed } = require('discord.js');
const Command = require('../../command');

class EmbedCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'embed',
            description: 'Embeds text.',
            usage: 'embed [text]'
        };
    }

    async run (client, message, args) {

        const embed = new MessageEmbed()
            .setColor(client.utils.embedColor)
            .setDescription(args.join(' '));

        message.edit({ embed });
    }
}

module.exports = EmbedCommand;