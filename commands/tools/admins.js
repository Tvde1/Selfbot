const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('admins', 'Gets a list of all administrators.', 'admins'));
    }

    async run(message) {
        const newGuild = await message.guild.members.fetch();

        const admins = newGuild.members.filter(x => x.hasPermission('ADMINISTRATOR'));
        message.EmbedEdit('All admins:', admins.map(x => x.toString()).join(', ') + '.');
    }
};
