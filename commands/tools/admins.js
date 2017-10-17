const Command = require('../../command');

class AdminsCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'admins',
            description: 'Gets a list of all administrators.',
            usage: 'admins'
        };
    }

    async run (client, message) {
        const newGuild = await message.guild.members.fetch();

        const admins = newGuild.members.filter(x => x.hasPermission('ADMINISTRATOR'));
        message.EmbedEdit('All admins:', admins.map(x => x.toString()).join(', ') + '.');
    }
}

module.exports = AdminsCommand;