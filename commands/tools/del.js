exports.run = (client, message, args) => {

    if (isNaN(args[0]) || args[0] === ' ') throw new Error('The correct syntax is `!del [number]`.');
    const number = parseInt(args[0]);

    client.tools.DeleteMyMessages(client, message.channel, number + 1);

    switch (message.channel.type) {
        case 'dm':
            client.log(`Deleted ${number} messages in private chat with ${message.channel.recipient.username}.`);
            break;
        case 'group':
            client.log(`Deleted ${number} messages in group DM ${message.channel.name}.`);
            break;
        case 'text':
            client.log(`Deleted ${number} messages in #${message.channel.name} in guild ${message.guild.name}.`);
            break;
    }
};

exports.help = {
    name: 'del',
    description: 'Deletes an amount of messages in the channel.',
    usage: 'del [number]'
};