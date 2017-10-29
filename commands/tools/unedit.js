const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class UneditCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('unedit', 'Displays all the edits for a certain message.', 'unedit <message id>'));
    }

    async run(message, args) {
        let id = args[0];

        if (!id) {
            const editedMessages = message.channel.messages.filterArray(x => x.edits.length > 1);

            if (editedMessages.length === 0) throw new Error('Can\'t find any edited message.');
            id = editedMessages[editedMessages.length - 1].id;
        }

        const editedMessage = message.channel.messages.get(id);
        if (!editedMessage) throw new Error('Could not find that message.');

        let edits = editedMessage.edits;
        edits = edits.reverse();

        const embed = new discord.MessageEmbed()
            .setTitle('Unedit')
            .setAuthor((editedMessage.member ? editedMessage.member.displayName : editedMessage.author.username), editedMessage.author.avatarURL('png'))
            .setColor(this.client.utils.embedColor)
            .setDescription(`Displaying all edits for ${editedMessage.member ? editedMessage.member.displayName : editedMessage.author.username}`)
            .addField('Original Message:', edits[0].content ? edits[0].content : 'EMPTY')
            .setFooter(`By @${editedMessage.author.username}`)
            .setTimestamp(editedMessage.createdAt);


        edits = edits.splice(1);
        let i = 0;
        for (i = 0; i < message.edits.length; i++)
            embed.addField(`Edit ${i + 1}:`, edits[i].content ? edits[i].content : 'EMPTY');

        message.edit(message.content, {embed});
    }
}

module.exports = UneditCommand;