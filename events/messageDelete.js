exports.run = (client, message) => {
    if (!client.deletedMessages) client.deletedMessages = {};
    client.deletedMessages[message.channel.id] = message;
    client.deletedMessages[message.author.id] = message;
};