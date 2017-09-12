const discord = require('discord.js');

exports.run = (client, message) => {
    const embed = new discord.MessageEmbed()
        .setColor(5267072)
        .setAuthor('Discord Nitro Message', 'https://cdn.Discordapp.com/emojis/264287569687216129.png')
        .setDescription('[Discord Nitro](https://Discordapp.com/nitro) is **required** to view this message.')
        .setThumbnail('https://cdn.Discordapp.com/attachments/194167041685454848/272617748876492800/be14b7a8e0090fbb48135450ff17a62f.png');
    message.edit({embed});
};

exports.help = {
    name: 'nitro',
    description: 'Sends a message only Nitro™ users can see.',
    usage: 'nitro'
};