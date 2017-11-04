const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class UndelCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('undel', 'Sends the last deleted message from the channel/user.', 'undel <[channel id] | user [user id]>'));
    }

    async run(message, args) {
        let delMessage;
        if (!this.client.deletedMessages) this.client.deletedMessages = new Map();

        if (args.length === 0) {
            let channelId = message.channel.id;
            delMessage = this.client.deletedMessages.get(channelId);
            if (!delMessage) throw new Error('Could not find any deleted messages of this channel.');
        }
        else if (args.length === 1) {
            if (isNaN(args[0])) throw new Error('Your channel id seems to be incorrect.');

            let channelId = args[0];
            delMessage = this.client.deletedMessages.get(channelId);
            if (!delMessage) throw new Error('Could not find any deleted messages of this channel.');
        }
        else if (args.length >= 2 && args[0] === 'user') {
            if (isNaN(args[1])) throw new Error('Your user id doesn\'t seem to be a number.');

            delMessage = this.client.deletedMessages.get(args[2]);
            if (!delMessage) throw new Error('Could not find any deleted messages of this user.');
        } else {
            throw new Error('Wrong parameters.');
        }

        const info = delMessage.guild
            ? `${delMessage.guild.name} (${delMessage.channel.name})`
            : (delMessage.channel.name
                ? `#${delMessage.channel.name}`
                : `PM with ${delMessage.channel.recipient.username}`);

        let embed = new discord.MessageEmbed()
            .setAuthor((delMessage.member ? delMessage.member.displayName : delMessage.author.username), delMessage.author.avatarURL('png'))
            .setTitle(info)
            .setDescription(delMessage.content)
            .setColor(this.client.utils.embedColor);

        if (delMessage.attachments.size > 0) {
            embed.setImage(delMessage.attachments.first().proxyURL);
        }
        embed.setFooter(`By @${delMessage.author.username}`)
            .setTimestamp(delMessage.createdAt);

        message.edit(message.content, {embed});
    }
}

module.exports = UndelCommand;