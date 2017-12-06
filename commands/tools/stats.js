const { type, release, uptime } = require('os');
const { cpuLoad, memoryUsage }  = require('os-toolbox');
const { execSync }              = require('child_process');
const CommandInfo               = require('../../templates/commandInfo');
const Command                   = require('../../templates/command');
const Discord                   = require('discord.js');
const moment                    = require('moment');
require('moment-duration-format');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('stats', 'Gives some useful bot statistics', 'stats'));
    }

    async run(message) {
        const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        const xd = uptime();
        const uptimeNumber = moment.duration(xd * 1000).format(' D [days], H [hrs], m [mins], s [secs]');
        const usedMemory = await memoryUsage();
        const maxMemory = process.env.LOCAL ? 8096 : 512;

        await message.edit('Loading...');

        message.edit(`${message.content}\n\`\`\`asciidoc\n= STATISTICS =
Bot:
• Uptime           :: ${duration}
• Users            :: ${this.client.users.size.toLocaleString()}
• Heartbeat Ping   :: ${Math.round(this.client.ping)}ms
• Message Ping     :: ${Math.round(message.editedTimestamp - message.createdTimestamp)}ms
• Bot RAM Usage    :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100 / 100)} MB

Guilds and Channels:
• Guilds           :: ${this.client.guilds.size}
• Members          :: ${this.client.guilds.map(x => x.members.size).reduce((count, guild) => count += guild)}
• Emojis           :: ${this.client.emojis.size}
• Text Channels    :: ${this.client.channels.filter(channel => channel.type === 'text').size}
• Voice Channels   :: ${this.client.channels.filter(channel => channel.type === 'voice').size}
• Categories       :: ${this.client.channels.filter(channel => channel.type === 'category').size}

System:
• OS Type          :: ${String(type).replace('_', '-')} v${release}
• System Uptime    :: ${uptimeNumber}
• System RAM Usage :: ${usedMemory}% (${Math.round(usedMemory / 100 * maxMemory)} MB / ${process.env.LOCAL ? '8 GB' : '512 MB'})
• System CPU Usage :: ${await cpuLoad()}%

Versions:
• Discord.js       :: v${Discord.version}
• Node             :: ${process.version}
• NPM              :: ${String(execSync('npm -v'))}
\`\`\``);
    }
};
