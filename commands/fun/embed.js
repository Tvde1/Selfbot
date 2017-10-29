const { MessageEmbed } = require('discord.js');
const CommandInfo      = require('../../templates/commandInfo');
const Command          = require('../../templates/command');

class EmbedCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('embed', 'Embeds text.', 'embed [text]'));
    }

    async run(message, args) {

        const embed = new MessageEmbed()
            .setColor(this._client.utils.embedColor)
            .setDescription(args.join(' '));

        message.edit({ embed });
    }
}

module.exports = EmbedCommand;