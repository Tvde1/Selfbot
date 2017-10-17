const table = require('markdown-table');
const Command = require('../../command');

class EmojisCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'emojis',
            description: 'Sends a list of all emojis with their name.',
            usage: 'emojis'
        };
    }

    async run (client, message) {

        if (message.channel.type !== 'text') {
            throw new Error('You need to be in a guild to execute this command.');
        }
        
        const emojis = message.guild.emojis;
        
        if (emojis.size < 1) {
            message.EmbedEdit('No emojis :(', 'This server has no custom emoji.');
            return;
        }
        
        let messageToSend = 'List of custom emoji:\r\n';
        const tableItems = [['Code', 'Emoji']];
        
        let a = 0;
        emojis.forEach(emoji => {
            tableItems.push([`emoi_${a++}`, ':' + emoji.name + ':']);
        });
        
        let tablestring = table(tableItems, {
            align: ['ll', 'll'],
            end: ''
        });
        
        let b = 0;
        emojis.forEach(emoji => {
            tablestring = tablestring.replace(`emoi_${b++}`, emoji);
        });
        
        messageToSend = messageToSend + tablestring;
        
        message.channel.send(messageToSend, {split: true});
    }
}

module.exports = EmojisCommand;