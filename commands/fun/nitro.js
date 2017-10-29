const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');
const discord     = require('discord.js');

class NitroCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('nitro', 'Sends a message only Nitro™ users can see.', 'nitro'));
    }

    async run(, message) {
        const embed = new discord.MessageEmbed()
            .setColor(5267072)
            .setAuthor('Discord Nitro Message', 'https://cdn.Discordapp.com/emojis/264287569687216129.png')
            .setDescription('[Discord Nitro](https://Discordapp.com/nitro) is **required** to view this message.')
            .setThumbnail('https://cdn.Discordapp.com/attachments/194167041685454848/272617748876492800/be14b7a8e0090fbb48135450ff17a62f.png');
        message.edit({embed});
    }
}

module.exports = NitroCommand;