exports.run = async (client, message) => {
    await message.channel.send('**FUCK I SCREWED UP. THIS IS AN AUTOMATED SHUTDOWN MESSAGE**');
    client.destroy();
    process.exit(1);
};

exports.help = {
    name: 'abort',
    description: 'Shuts down the bot.',
    usage: 'abort'
};