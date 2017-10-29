const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class IntersectguildsCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('intersectguilds', 'Shows a list of the people in both guilds.', 'intersectguilds [guild id] <guild id 2>'));
    }

    async run(message, args) {
        let guild1;
        let guild2;

        if (args.length < 1) throw new Error('Please input a guild ID.');

        if (args.length === 1) {
            guild1 = this.client.guilds.get(args[0]);
            if (!guild1) throw new Error('Your Guild ID is not correct.');
            guild2 = message.guild;
            if (!guild2) throw new Error('You are not in a guild. Please input a 2nd id.');
        }
        else if (args.length === 2) {
            guild1 = this.client.guilds.get(args[0]);
            if (!guild1) throw new Error('Your Guild 1 ID is not correct.');
            guild2 = this.client.guilds.get(args[1]);
            if (!guild2) throw new Error('Your Guild 2 ID is not correct.');
        }

        await guild1.members.fetch();
        await guild2.members.fetch();
        let guild1Ids = guild1.members.map(x => x.user.id);
        let guild2Ids = guild2.members.map(x => x.user.id);

        let intersectedList = guild1Ids.filter(n => guild2Ids.includes(n));
        let memberList = intersectedList.map(x => guild2.members.get(x).user.username);

        const embed = new discord.MessageEmbed()
            .setTitle('Intersect Guilds')
            .setColor(this.client.utils.embedColor)
            .setDescription(`Intersected guild '${guild1.name}' and guild '${guild2.name}'.`)
            .addField('Amount', `There are ${intersectedList.length} members present in both guilds.`)
            .addField('Users', 'Below is a list of all the users:');

        message.edit(message.content, {embed});

        message.channel.send('```\n' + memberList.join(', ') + '```', {
            split: {
                prepend: '```\n',
                append: '\n```',
                char: ', '
            }
        });
    }
}

module.exports = IntersectguildsCommand;