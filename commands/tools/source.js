const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('source', 'Gets the markdown source of the specified message ID in the same channel.', 'source [message ID]'));
    }

    async run(message, args) {
        message.channel.messages.fetch(args[0])
            .then(replyToMsg => {
                message.edit(`${message.content}\n==========\nSource Code for MSG ID ${replyToMsg}:\n\`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``);
            }).catch(console.error);
    }
};

const clean = text => {
    if (typeof text === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
};