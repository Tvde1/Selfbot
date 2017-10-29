const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class NotkickableCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('notkickable', 'Returns a list of users you can not kick.', 'notkickable'));
    }

    async run (client, message) {
        if (message.channel.type !== 'text') throw new Error('You aren\'t in a guild.');
        await message.guild.members.fetch();
        const kickMemberList = message.guild.members.filter(x => !x.kickable);
        if (kickMemberList.size === 0) return this.client.EmbedEdit(message, 'You can not kick anyone!', 'yay');
        message.EmbedEdit(`You can not kick **${kickMemberList.size}** members!`, `They are:\n${kickMemberList.map(x => x.toString()).join(', ')}.`);
    }
}

module.exports = NotkickableCommand;