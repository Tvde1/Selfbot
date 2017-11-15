const { MessageEmbed } = require('discord.js');
const CommandInfo      = require('../../templates/commandInfo');
const Command          = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('embed', 'Embeds text.', 'embed [text]'));
    }

    async run(message, args) {

        const embed = new MessageEmbed()
            .setColor(this.client.utils.embedColor)
            .setDescription(args.join(' '));

        message.edit({ embed });
    }
};
