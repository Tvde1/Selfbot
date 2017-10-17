const Command = require('../../command');

class SourceCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'source',
            description: 'Gets the markdown source of the specified message ID in the same channel.',
            usage: 'source [message ID]'
        };
    }

    async run (client, message, args) {
        message.channel.messages.fetch(args[0])
            .then(replyToMsg => {
                message.edit(`${message.content}\n==========\nSource Code for MSG ID ${replyToMsg}:\n\`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``);
            }).catch(console.error);
    }
}

module.exports = SourceCommand;

function clean(text) {
    if (typeof(text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
}