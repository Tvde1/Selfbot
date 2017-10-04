exports.run = function (bot, msg, args) {
    msg.channel.messages.fetch(args[0])
        .then(replyToMsg => {
            msg.edit(`${msg.content}\n==========\nSource Code for MSG ID ${replyToMsg}:\n\`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``);
        }).catch(console.error);
};

exports.help = {
    name: 'source',
    description: 'Gets the markdown source of the specified message ID in the same channel.',
    usage: 'source [message ID]'
};

function clean(text) {
    if (typeof(text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
}