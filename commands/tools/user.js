const { GuildMember } = require('discord.js');
const discord = require('discord.js');
const moment = require('moment');
const Command = require('../../command');

class UserCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'user',
            description: 'Displays info about the user.',
            usage: 'user [username|@mention]'
        };
    }

    async run (client, message, args) {
        if (args.length === 0) throw new Error('Please specify a username.');
        if (message.mentions.users.size > 0) return showInfo(client, message, message.mentions.members.first());

        const user = await client.utils.getUser(client, message.channel, args.join());
        if (user) showInfo(client, message, user);
        else throw new Error('Could not find user.');
    }
}

module.exports = UserCommand;

function showInfo(client, message, user) {
    if (user instanceof GuildMember) {

        const embed = new discord.MessageEmbed()
            .setColor(client.utils.embedColor)
            .setThumbnail(user.user.avatarURL, true)
            .addField('ℹ Username:', user.user.username, true)
            .addField('ℹ Display Name:', user.displayName === user.user.username ? 'No Nickname' : user.displayName, true)
            .addField('🗓 Discord Join Date:', client.utils.capitaliseFirstLetter(moment(user.user.createdAt).fromNow()) + ' (' + moment(user.user.createdAt).format('MMMM Do YYYY') + ')', true)
            .addField('📥 Server Join Date:', client.utils.capitaliseFirstLetter(moment(user.joinedAt).fromNow()) + ' (' + moment(user.joinedAt).format('MMMM Do YYYY') + ')', true)
            .addField('🤖 Bot:', client.utils.niceBool(user.user.bot), true)
            .addField('ℹ Status:', client.utils.capitaliseFirstLetter(user.presence.status), true)
            .addField('🕹 Playing:', (user.presence.game ? user.presence.game.name : 'None') + '.', true)
            .addField('ℹ Roles:', user.roles.map(x => x.name).join(', ') + '.', true)
            .addField('🗣 Deafened:', client.utils.niceBool(user.deaf), true)
            .addField('🔇 Muted:', client.utils.niceBool(user.mute), true);

        message.edit(message.content, {embed});

    } else {

        const embed = new discord.MessageEmbed()
            .setColor(client.utils.embedColor)
            .setThumbnail(user.avatarURL)
            .addField('ℹ Username:', user.username, true)
            .addField('🤖 Bot:', client.utils.niceBool(user.bot), true)
            .addField('🗓 Discord Join Date:', client.utils.capitaliseFirstLetter(moment(user.createdAt).fromNow()) + ' (' + moment(user.createdAt).format('MMMM Do YYYY') + ')', true)
            .addField('ℹ Status:', client.utils.capitaliseFirstLetter(user.presence.status), true)
            .addField('🕹 Playing:', (user.presence.game ? user.presence.game.name : 'None'), true);

        message.edit(message.content, {embed});
    }
}