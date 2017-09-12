const discord = require('discord.js');

exports.run = async (client, message, args) => {

    if (args.length < 1) throw new Error('Please paste the ID of the command you want quoted.');
    const id = args[0];

    let quoteMessage;

    try {
        quoteMessage = await message.channel.messages.fetch(id.toString())
    } catch (err) {
        throw new Error('Cannot retrieve that message.');
    }

    const embed = new discord.MessageEmbed()
        .setAuthor(quoteMessage.member ? quoteMessage.member.displayName : quoteMessage.author.username, quoteMessage.author.avatarURL())
        .setColor(client.tools.EmbedColor)
        .setDescription(quoteMessage.content)
        .setFooter('By @' + quoteMessage.author.username)
        .setTimestamp(quoteMessage.createdAt);

    message.edit({embed});
};

exports.help = {
    name: 'quote',
    description: 'Sends a message as a quote.',
    usage: 'quote [message id]'
};