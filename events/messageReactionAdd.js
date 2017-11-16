module.exports = async (client, reaction, user) => {
    if (user.id !== client.user.id) return;

    if (reaction.emoji.name === '📤') {
        reaction.remove();

        const image = reaction.message.attachments.first() || reaction.message.embeds[0] ? reaction.message.embeds[0].image : null;

        let options = image ? { files: [ image.url ]} : null;
        let message = image ? null : `Lol! ${reaction.message.author.username} said:\n"${reaction.message.content}"`;

        for (const channel of client.config.memechannels) {
            if (channel === reaction.message.channel.id) continue;
            client.channels.get(channel).send(message, options).catch(console.err);
        }
    }
};