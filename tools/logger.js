                                  require('colors');     //eslint-disable-line indent
const Utils                     = require('./utils.js'); //eslint-disable-line no-unused-vars
const moment                    = require('moment');
const { Message, MessageEmbed } = require('discord.js'); //eslint-disable-line no-unused-vars

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
        const logTime = !process.env.DONTLOGTIME;
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`${logTime ? `${time} || ` : ''} ${'LOG'.green}  || ${title}${description ? ' | ' + description : ''}`);
    }

    /**
     * Logs an error in the console.
     * @param {string} title The title of the error message.
     * @param {string} description The description of the error message.
     */
    error(title, description) {
        const logTime = !process.env.DONTLOGTIME;
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.error(`${logTime ? `${time} || ` : ''}${time}${'ERROR'.red} || ${title}${description ? ' | ' + description : ''}`);
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
            .setColor(this.embedColor);

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
            .setColor(this.embedColor);

        mentionChannel.send(embed);
    }

}

module.exports = Logger;