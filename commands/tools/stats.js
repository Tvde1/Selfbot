const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class StatsCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('stats', 'Gives some useful bot statistics', 'stats'));
    }

    async run (client, message) {
        const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        message.edit(`${message.content}\n\`\`\`asciidoc\n= STATISTICS =
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