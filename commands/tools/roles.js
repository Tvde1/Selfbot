const discord = require('discord.js');
const Command = require('../../command');

class RolesCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'roles',
            description: 'Sends a list of roles, color and users per role.',
            usage: 'roles <guild id>'
        };
    }

    async run (client, message, args) {
        let serverId = args[0];
        if (serverId) {
            if (serverId === ' ' || isNaN(serverId)) throw new Error('Your server ID is not a number,');
        } else {
            serverId = message.guild.id;
            if (!message.guild) throw new Error('You have to be in a server, or put a server ID.');
        }

        const guild = client.guilds.get(serverId);
        if (!guild) throw new Error('Your GuildID is invalid. Are you sure you\'re in it?');

        let embed = new discord.MessageEmbed()
            .setColor(client.utils.embedColor)
            .setTitle(`Role Distribution in ${guild.name}.`)
            .setDescription('Here\'s all the roles with the amount of members that have said role.');

        await guild.members.fetch();

        guild.roles.array().sort(function (a, b) {
            return b.position - a.position;
        }).forEach(x => {
            const memberList = x.members.size > 20 ? '> 20 members.' : x.members.map(x => x.toString()).join(', ');
            embed.addField(x.name, `Hex Color: **${x.hexColor}**. Members: **${x.members.size}**\r\n**Member List:** ${memberList}.`, true);
        });
        message.edit(message.content, {embed});
    }
}

module.exports = RolesCommand;