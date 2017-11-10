const { GuildMember } = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class WhsayCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('whsay', 'Uses a webhook to impersonate a person', 'whsay [user | @user] [test...]'));
    }

    async run(message, args) {
        if (!message.channel.permissionsFor(this.client.user).has('MANAGE_WEBHOOKS')) throw new Error('Missing Permissions');

        const [name, ...text] = args;

        let user = message.mentions.members.first() || await this.client.utils.getUser(message.channel, name);
        if (!user) throw new Error('User not found.');

        let webhook;

        if (user instanceof GuildMember) {
            webhook = await message.channel.createWebhook(user.displayName, { avatar: user.user.displayAvatarURL() });
        } else {
            webhook = await message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL() });
        }

        await webhook.send(text.join(' '));
        webhook.delete();
    }
}

module.exports = WhsayCommand;