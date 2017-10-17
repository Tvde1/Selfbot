const { GuildMember } = require('discord.js');
const Command = require('../../command');

class WhsayCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'whsay',
            description: '',
            usage: 'whsay [user | @user] [test...]'
        };
    }

    async run (client, message, args) {
        if (!message.channel.permissionsFor(client.user).has('MANAGE_WEBHOOKS')) throw new Error('Missing Permissions');

        const [name, ...text] = args;

        let user = message.mentions.members.first() || await client.utils.getUser(client, message.channel, name);
        if (!user) throw new Error('User not found.');

        let webhook;

        if (user instanceof GuildMember) {
            webhook = await message.channel.createWebhook(user.displayName, { avatar: user.user.displayAvatarURL() });
        } else {
            webhook = await message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL() });
        }

        webhook.send(text.join(' '));
        webhook.delete();
    }
}

module.exports = WhsayCommand;