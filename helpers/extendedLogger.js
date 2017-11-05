const { Message, MessageEmbed, WebhookClient } = require('discord.js'       ); //eslint-disable-line no-unused-vars
const ExtendedClient                           = require('../extendedClient'); //eslint-disable-line no-unused-vars
const Utils                                    = require('./utils.js'       ); //eslint-disable-line no-unused-vars
const tvde1logger                              = require('tvde1logger'      );
                                                 require('colors'           ); //eslint-disable-line indent

class Logger extends tvde1logger {
    
    /**
     * 
     * @param {ExtendedClient} client The channels to log in;
     * @param {Utils} utils Utils.
     */
    constructor(client, utils) {
        super('Selfbot', !process.env.DONTLOGTIME);
        this.client = client;
        this.utils  = utils;

        this.logWebhook     = new WebhookClient(client.config.webhooks.logs.id,     client.config.webhooks.logs.token    );
        this.mentionWebhook = new WebhookClient(client.config.webhooks.mentions.id, client.config.webhooks.mentions.token);
    }

    /**
     * Puts a log message in the log channel.
     * @param {string} title The title of the log message. 
     * @param {string} description The description of the log message.
     */
    logInChannel(title, description) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(this.client.author)
            .setColor(this.utils.embedColor);

        this.logWebhook.send({embed});
    }

    /**
     * Puts a mention message in the mention channel.
     * @param {Message} message The message in which you are mentioned.
     */
    logMention(message) {
        const embed = new MessageEmbed()
            .setTitle('Mention')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(`${message.author.tag} mentioned me in ${message.guild ? `#${message.channel.name} (${message.guild.name})` : 'DMs'}.`)
            .setDescription(message.cleanContent)
            .setColor(this.utils.embedColor);

        this.mentionWebhook.send({embed});
    }
}

module.exports = Logger;