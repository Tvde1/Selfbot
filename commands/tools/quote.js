const discord = require('discord.js');
const Command = require('../../command');

class QuoteCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'quote',
            description: 'Sends a message as a quote.',
            usage: 'quote [message id]'
        };
    }

    async run (client, message, args) {
        if (args.length === 0) throw new Error('Please paste the ID of the command you want quoted.');
        const id = args[0];

        let quoteMessage;

        try {
            quoteMessage = await message.channel.messages.fetch(id.toString());
        } catch (err) {
            throw new Error('Cannot retrieve that message.');
        }

        const embed = new discord.MessageEmbed()
            .setAuthor(quoteMessage.member ? quoteMessage.member.displayName : quoteMessage.author.username, quoteMessage.author.avatarURL())
            .setColor(client.utils.embedColor)
            .setDescription(quoteMessage.content)
            .setFooter('By @' + quoteMessage.author.username)
            .setTimestamp(quoteMessage.createdAt);

        message.edit({embed});
    }
}

module.exports = QuoteCommand;