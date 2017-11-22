const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('fundel', 'Fake undel.', 'fundel <user> <text>'));
    }

    async run(message, args) {
        let [username, ...text] = args;
        
        if (!username || text.length === 0) {
            throw new Error('Bad arguments.');
        }

        text = text.join(' ');
        let user = await this.client.utils.getUser(message.channel, username);

        if (!user) {
            throw new Error('Can\'t find an user with that name.');
        }

        const info = message.guild
            ? `${message.guild.name} (${message.channel.name})`
            : (message.channel.name
                ? `#${message.channel.name}`
                : `PM with ${message.channel.recipient.username}`);

        let embed = new discord.MessageEmbed()
            .setAuthor((user.displayName || user.username), (user.user || user).avatarURL('png'))
            .setTitle(info)
            .setDescription(text)
            .setColor(this.client.utils.embedColor);

        embed.setFooter(`By @${(user.user || user).username}`)
            .setTimestamp(message.createdAt);

        message.edit(`${this.client.config.prefix}undel`, { embed });
    }
};
