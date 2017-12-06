module.exports = (client, message) => {        
    if (!client.deletedMessages) {
        client.deletedMessages = new Map();
    }
    client.deletedMessages.set(message.channel.id, message);
    client.deletedMessages.set(message.author.id, message);
};