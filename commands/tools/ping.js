const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('ping', 'It... like... pings. Then Pongs. And it\'s not Ping Pong.', 'ping'));
    }

    async run(message) {
        let msg = await message.channel.send('Ping?');
        msg.EmbedEdit('Pong!', `Latency is ${message.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms`);
    }
};
