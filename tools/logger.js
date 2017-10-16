const { Message, MessageEmbed } = require('discord.js');
const moment                    = require('moment');
const Utils                     = require('./utils.js');

class Logger {
    
    /**
     * 
     * @param {*} channels The channels to log in;
     * @param {Utils} utils Utils.
     */
    constructor(channels, utils) {
        this.channels = channels;
        this.utils = utils;
    }

    /**
     * Logs in the console.
     * @param {string} title The title of the log message. 
     * @param {string} description The description of the log message.
     */
    log(title, description) {
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`${time} || ${title}${description ? ' | ' + description : ''}`);
    }

    /**
     * Logs an error in the console.
     * @param {string} title The title of the error message.
     * @param {string} description The description of the error message.
     */
    error(title, description) {
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.error(`${time} || ERROR || ${title}${description ? ' | ' + description : ''}`);
    }

    /**
     * Puts a log message in the log channel.
     * @param {string} title The title of the log message. 
     * @param {string} description The description of the log message.
     */
    logInChannel(title, description) {

        const logChannel = this.channels.logChannel;
        if (!logChannel) throw new Error('No log channel found');

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(this.client.author)
            .setColor(this.client.tools.EmbedColor);

        logChannel.send(embed);
    }

    /**
     * Puts a mention message in the mention channel.
     * @param {Message} message  The message in which you are mentioned.
     */
    logMention(message) {

        const mentionChannel = this.cannels.mentionChannel;
        if (mentionChannel) throw new Error('No mention channel found.');

        const embed = new MessageEmbed()
            .setTitle('Mention')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTitle(`${message.member.tag} mentioned me in ${message.guild ? `$${message.channel.name} (${message.guild.name})` : 'DMs'}.`)
            .setDescription(message.cleanContent)
            .setColor(this.client.tools.EmbedColor);

        mentionChannel.send(embed);
    }

}

module.exports = Logger;