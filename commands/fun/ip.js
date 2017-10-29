const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class IpCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('ip', 'Tracks TCP packets through DHCP reverse proxy or HTTP BlueTooh services to get the IP adress of a user.', 'ip [name|@mention]'));
    }

    async run(message, args) {
        let username = this.client.utils.CapitaliseFirstLetter(args.join(' '));
        if (message.mentions.users.size > 0) username = message.mentions.users.first().username;
        message.EmbedEdit('ℹ IP Finder.', `${username}'s IP is: **${Math.floor((Math.random() * 126) + 1)}.${Math.floor((Math.random() * 255) + 1)}.${+Math.floor((Math.random() * 255) + 1)}.${+Math.floor((Math.random() * 255) + 1)}**.`);
    }
}

module.exports = IpCommand;