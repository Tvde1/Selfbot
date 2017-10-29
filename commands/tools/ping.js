const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class PingCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('ping', 'It... like... pings. Then Pongs. And it\'s not Ping Pong.', 'ping'));
    }

    async run (client, message) {
        let msg = await message.channel.send('Ping?');
        msg.EmbedEdit('Pong!', `Latency is ${message.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
}

module.exports = PingCommand;