const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('channels', 'Displays all types of channels for a guild.', 'channels [guild id]'));
    }

    async run(message, args) {
        let guild = message.guild;
        if (args[0]) {
            guild = this.client.guilds.get(args[0]);
            if (!guild) throw new Error('Your guild id is incorrect.');
        }

        let embed = new discord.MessageEmbed()
            .setTitle(`All channels in guild ${guild.name}.`)
            .setColor(this.client.utils.embedColor);

        let textChannels = '';
        let voiceChannels = '';

        guild.channels.sort((a, b) => a.position - b.position).forEach(x => {
            const text = x.name +
            (x.permissionsFor(message.member).has('VIEW_CHANNEL') ? '' : ' (hidden)') +
            '\r\n';

            if (x.type === 'text') textChannels += text;
            else voiceChannels += text;
        });

        embed.addField('Text Channels:', textChannels || 'none', true)
            .addField('Voice Channels: ', voiceChannels || 'none', true);

        message.edit(message.content, {embed: embed});
    }
};
