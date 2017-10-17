const Command = require('../../command');

class BelikeCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'belike',
            description: 'Sends a belike meme with the name and gender.',
            usage: 'belike [m/f] [name]'
        };
    }

    async run (client, message, args) {
        if (args.length < 2) throw new Error('The syntax is: `' + client.config.prefix + 'belike [m/f] [name]`');

        const file = `http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${args.slice(1).join(' ')}&sex=${args[0]}`;
        message.channel.send('', {
            files: [{
                attachment: file,
                name: 'belike.png'}
            ]
        });
    }
}

module.exports = BelikeCommand;