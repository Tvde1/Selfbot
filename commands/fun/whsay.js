const { GuildMember } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user).has('MANAGE_WEBHOOKS')) throw new Error('Missing Permissions');

    const [name, ...text] = args;

    let user = message.mentions.members.first() || await client.tools.GetUser(client, message.channel, name);
    if (!user) throw new Error('No user');

    let webhook;

    if (user instanceof GuildMember) {
        webhook = await message.channel.createWebhook(user.displayName, { avatar: user.user.displayAvatarURL() });
    } else {
        webhook = await message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL() });
    }

    webhook.send(text.join(' '));
    webhook.delete();
};

exports.help = {
    name: 'whsay',
    description: '',
    usage: 'whsay [user | @user] [test...]'
};