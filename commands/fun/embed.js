const discord = require('discord.js');

exports.run = function (client, message, args) {
    const embed = new discord.MessageEmbed()
        .setDescription(args.join(' '))
        .setColor(client.tools.EmbedColor);

    message.edit({embed});
};

exports.help = {
    name: 'embed',
    description: 'Embeds text.',
    usage: 'embed [text]'
};