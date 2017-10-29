const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class RandomcatCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('randomcat', 'Sends a random cat.', 'randomcat'));
    }

    async run(message) {
        message.channel.send({
            files: [{
                attachment: 'http://thecatapi.com/api/images/get?format=src&type=png',
                name: 'cat.png'
            }]
        });
    }
}

module.exports = RandomcatCommand;