const { GuildMember } = require('discord.js');
const discord = require('discord.js');
const moment = require('moment');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {
    constructor(client) {
        super(client, new CommandInfo('user', 'Displays info about the user.', 'user [username|@mention]'));
    }

    async run(message, args) {
        if (args.length === 0) throw new Error('Please specify a username.');
        if (message.mentions.users.size > 0) return showInfo(this.client, message, message.mentions.members.first());

        const user = await this.client.utils.getUser(message.channel, args.join());
        if (user) showInfo(this.client, message, user);
        else throw new Error('Could not find user.');
    }
};

const showInfo = (client, message, user) => {
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
};