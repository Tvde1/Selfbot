const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('belike', 'Sends a belike meme with the name and gender.', 'belike [m/f] [name]'));
    }

    async run(message, args) {
        if (args.length < 2) throw new Error('The syntax is: `' + this.client.config.prefix + 'belike [m/f] [name]`');

        const file = `http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${args.slice(1).join(' ')}&sex=${args[0]}`;
        message.channel.send('', {
            files: [{
                attachment: file,
                name: 'belike.png'}
            ]
        });
    }
};
