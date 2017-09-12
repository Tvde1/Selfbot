const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = function (bot, msg, args) {
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    msg.edit(`${msg.content}\n\`\`\`asciidoc\n= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${bot.users.size.toLocaleString()}
• Servers    :: ${bot.guilds.size.toLocaleString()}
• Channels   :: ${bot.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Node       :: ${process.version}\`\`\``);
};

exports.help = {
    name: 'stats',
    description: 'Gives some useful bot statistics',
    usage: 'stats'
};