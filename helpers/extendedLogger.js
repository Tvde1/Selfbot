                                  require('colors');            //eslint-disable-line indent
const Utils                     = require('./utils.js');        //eslint-disable-line no-unused-vars
const tvde1logger               = require('tvde1logger');
const ExtendedClient            = require('../extendedClient'); //eslint-disable-line no-unused-vars
const { Message, MessageEmbed } = require('discord.js');        //eslint-disable-line no-unused-vars

class Logger extends tvde1logger {
    
    /**
     * 
     * @param {ExtendedClient} client The channels to log in;
     * @param {Utils} utils Utils.
     */
    constructor(client, utils) {
        super('Selfbot', !process.env.DONTLOGTIME);
        this.client = client;
        this.utils = utils;
    }

    /**
     * Puts a log message in the log channel.
     * @param {string} title The title of the log message. 
     * @param {string} description The description of the log message.
     */
    logInChannel(title, description) {
        let logChannel = this.client.config.channels.logs;
        if (!logChannel) throw new Error('No log channel found');

        logChannel = this.client.channels.get(logChannel);

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(this.client.author)
            .setColor(this.utils.embedColor);

        logChannel.send(embed);
    }

    /**
     * Puts a mention message in the mention channel.
     * @param {Message} message The message in which you are mentioned.
     */
    logMention(message) {
        let mentionChannel = this.client.config.channels.mentions;
        if (!mentionChannel) throw new Error('No mention channel found.');

        mentionChannel = this.client.channels.get(mentionChannel);

        const embed = new MessageEmbed()
            .setTitle('Mention')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(`${message.author.tag} mentioned me in ${message.guild ? `#${message.channel.name} (${message.guild.name})` : 'DMs'}.`)
            .setDescription(message.cleanContent)
            .setColor(this.utils.embedColor);

        mentionChannel.send(embed);
    }
}

module.exports = Logger;