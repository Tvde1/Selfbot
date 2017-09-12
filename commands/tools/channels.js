const discord = require('discord.js');

exports.run = (client, message, args) => {
    let guild = message.guild;
    if (args[0]) {
        guild = client.guilds.get(args[0]);
        if (!guild) throw new Error('Your guild id is incorrect.');
    }

    let embed = new discord.MessageEmbed()
        .setTitle(`All channels in guild ${guild.name}.`)
        .setColor(client.tools.EmbedColor);

    let textChannels = '';
    let voiceChannels = '';

    guild.channels.sort(function (a, b) {
        return a.position - b.position;
    }).forEach(x => {
        const text = x.name +
            (x.permissionsFor(message.member).has('VIEW_CHANNEL') ? '' : ' (hidden)') +
            '\r\n';

        if (x.type === 'text') textChannels += text;
        else voiceChannels += text;
    });

    embed.addField('Text Channels:', textChannels || 'none', true)
        .addField('Voice Channels: ', voiceChannels || 'none', true);

    message.edit(message.content, {embed: embed});
};

exports.help = {
    name: 'channels',
    description: 'Displays all types of channels for a guild.',
    usage: 'channels [guild id]'
};