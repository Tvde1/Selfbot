const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('quote', 'Sends a message as a quote.', 'quote [message id]'));
    }

    async run(message, args) {
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
            .setColor(this.client.utils.embedColor)
            .setDescription(quoteMessage.content)
            .setFooter('By @' + quoteMessage.author.username)
            .setTimestamp(quoteMessage.createdAt);

        message.edit({embed});
    }
};
