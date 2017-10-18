const Command = require('../../command');

class PingCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'ping',
            description: 'It... like... pings. Then Pongs. And it\'s not Ping Pong.',
            usage: 'ping'
        };
    }

    async run (client, message) {
        let msg = await message.channel.send('Ping?');
        msg.EmbedEdit('Pong!', `Latency is ${message.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
}

module.exports = PingCommand;