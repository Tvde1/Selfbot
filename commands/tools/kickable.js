const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class KickableCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('kickable', 'Returns a list of users you can kick.', 'kickable'));
    }

    async run(, message) {
        if (message.channel.type !== 'text') throw new Error('You aren\'t in a guild.');
        await message.guild.members.fetch();
        const kickMemberList = message.guild.members.filter(x => x.kickable);
        if (kickMemberList.size === 0) return this.client.EmbedEdit(message, 'You can kick **0** members!', 'rip');
        message.EmbedEdit(`You can kick **${kickMemberList.size}** members!`, `They are:\n${kickMemberList.map(x => x.toString()).join(', ')}.`);
    }
}

module.exports = KickableCommand;