const Command = require('../../command');

class IpCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'ip',
            description: 'Tracks TCP packets through DHCP reverse proxy or HTTP BlueTooh services to get the IP adress of a user.',
            usage: 'ip [name|@mention]'
        };
    }

    async run (client, message, args) {
        let username = client.utils.CapitaliseFirstLetter(args.join(' '));
        if (message.mentions.users.size > 0) username = message.mentions.users.first().username;
        message.EmbedEdit('ℹ IP Finder.', `${username}'s IP is: **${Math.floor((Math.random() * 126) + 1)}.${Math.floor((Math.random() * 255) + 1)}.${+Math.floor((Math.random() * 255) + 1)}.${+Math.floor((Math.random() * 255) + 1)}**.`);
    }
}

module.exports = IpCommand;