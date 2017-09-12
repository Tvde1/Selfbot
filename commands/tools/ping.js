exports.run = async (client, msg) => {
    let message = await msg.channel.send("Ping?");
    message.EmbedEdit('Pong!', `Latency is ${message.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.help = {
    name: 'ping',
    description: 'It... like... pings. Then Pongs. And it\'s not Ping Pong.',
    usage: 'ping'
};