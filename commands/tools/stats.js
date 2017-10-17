const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

const Command = require('../../command');

class StatsCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'stats',
            description: 'Gives some useful bot statistics',
            usage: 'stats'
        };
    }

    async run (client, message) {
        const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        message.edit(`${client.content}\n\`\`\`asciidoc\n= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Node       :: ${process.version}\`\`\``);
    }
}

module.exports = StatsCommand;