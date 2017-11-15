const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('avatar', 'Gets the avatar of a person.', 'avatar [name | @mention]'));
    }

    async run(message, args) {
        const user = await this.client.utils.getUser(this.channel, args.join(' '));

        const embed = new discord.MessageEmbed()
            .setTitle(`${user.displayName || user.userName}'s avatar.`, )
            .setImage((user.user || user).avatarUrl('png'));

        message.channel.send(embed);
    }
};
