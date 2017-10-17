const Command = require('../../command');

class RandomcatCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'randomcat',
            description: 'Sends a random cat.',
            usage: 'randomcat'
        };
    }

    async run (client, message) {
        message.channel.send({
            files: [{
                attachment: 'http://thecatapi.com/api/images/get?format=src&type=png',
                name: 'cat.png'
            }]
        });
    }
}

module.exports = RandomcatCommand;