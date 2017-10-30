module.exports = (client, message) => {

    client.databaseClient.saveDeletedMessage(message);
        
    if (!client.deletedMessages) client.deletedMessages = new Map();
    client.deletedMessages.set(message.channel.id, message);
    client.deletedMessages.set(message.author.id, message);
};