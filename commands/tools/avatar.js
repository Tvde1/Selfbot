const discord = require('discord.js');
const Command = require('../../command');

class AvatarCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'avatar',
            description: 'Gets the avatar of a person.',
            usage: 'avatar [name | @mention]'
        };
    }

    async run (client, message, args) {
        const user = await client.utils.getUser(args.join(' '));

        const embed = new discord.MessageEmbed()
            .setTitle(`${user.displayName || user.userName}'s avatar.`, )
            .setImage((user.user || user).avatarUrl('png'));

        message.channel.send(embed);
    }
}

module.exports = AvatarCommand;