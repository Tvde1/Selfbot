const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command'    );
const discord     = require('discord.js'                 );
const moment      = require('moment'                     );

module.exports = new class extends Command {
    constructor(client) {
        super(client, new CommandInfo('guild', 'Displays all info about the guild.', 'guild <guild id>'));
    }

    async run(message, args) {
        let guild = args[0];

        if (!guild) guild = message.guild;

        if (!guild) throw new Error('You are not in a guild and you didn\'t supply an id.');

        guild = guild.id;

        try {
            guild = this.client.guilds.get(guild);
            await guild.members.fetch();
        }
        catch (err) {
            throw new Error(`Could not fetch this guild:\n${err}\n\nThe guild was: ${guild}`);
        }

        let members = guild.members;

        let onlineMembers = members.filter(x => x.presence.status === 'online').size;
        let idleMembers = members.filter(x => x.presence.status === 'idle').size;
        let dndMembers = members.filter(x => x.presence.status === 'dnd').size;
        let offlineMembers = members.filter(x => x.presence.status === 'offline').size;

        let channels = guild.channels;
        let textChannels = channels.filter(x => x.type === 'text').size;
        let voiceChannels = channels.filter(x => x.type === 'voice').size;

        let roles = guild.roles;
        let colorRoles = roles.filter(x => x.color !== 0).size;
        let normalRoles = roles.size - colorRoles;

        let emojisArr = guild.emojis;
        let bigEmojiArray = [''];
        emojisArr.forEach(emoji => {
            if (bigEmojiArray[bigEmojiArray.length - 1].length + emoji.toString().length >= 1000) bigEmojiArray.push(emoji);
            else bigEmojiArray[bigEmojiArray.length - 1] += emoji.toString();
        });

        let embed = new discord.MessageEmbed()
            .setColor(this.client.utils.embedColor)
            .setThumbnail(guild.iconURL, true)
            .addField('ℹ Name:', guild.name, true)
            .addField('🆔 ID:', guild.id, true)
            .addField('👥 Users:', `**${onlineMembers}** Online | **${idleMembers}** Idle | **${dndMembers}** DND | **${offlineMembers}** Offline | **${guild.memberCount}** Total.`, false)
            .addField('👤 Owner:', guild.owner.toString(), true)
            .addField('🗺 Region:', this.client.utils.capitaliseFirstLetter(guild.region), true)
            .addField('🗓 Created:', this.client.utils.capitaliseFirstLetter(moment(message.guild.createdAt).fromNow()) + ' (' + moment(message.guild.createdAt).format('MMMM Do YYYY') + ')', false)

            //.addField('👥 Total Users:', message.guild.memberCount, true)

            .addField('💬 Channels:', `**${textChannels}** Text | **${voiceChannels}** Voice | **${textChannels + voiceChannels}** Total`, true)
            .addField('ℹ Roles:', `**${colorRoles}** Color | **${normalRoles}** Normal | **${colorRoles + normalRoles}** Total`, true);

        if (emojisArr.size > 0) {
            if (bigEmojiArray.length > 1) {
                bigEmojiArray.forEach((tempEmojiString, index) => {
                    embed.addField('🤔 Custom Emojis no. ' + (index + 1) + ':', tempEmojiString, false);
                });
            }
            else embed.addField('🤔 Custom Emojis:', bigEmojiArray[0], false);
        }

        embed.addField('❗ Verfication Level:', guild.verificationLevel, true)
            .addField('💬 Default Channel:', guild.defaultChannel, true);

        message.edit(message.content, { embed });
    }
};
