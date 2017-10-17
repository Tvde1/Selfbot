exports.run = async (client, reaction, user) => {
    if (user.id !== client.user.id) return;

    if (reaction.emoji.name === '📤') {
        reaction.remove();

        const image = reaction.message.attachments.first();

        let options = image ? { files: [ image.url ]} : null;
        let message = image ? null : `Lol! ${reaction.message.author.username} said:\n"${reaction.message.content}"`;

        const memeChannels = [
            '210041381874302976',
            '236881526594207744',
            '272118370206351360',
            '290592579844833281',
            '357431715427516418'
        ];

        for (const channel of memeChannels) {
            if (channel === reaction.message.channel.id) continue;
            client.channels.get(channel).send(message, options).catch(console.err);
        }
    }
};