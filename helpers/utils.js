const { Channel, Message, MessageEmbed } = require('discord.js'); //eslint-disable-line no-unused-vars
const fetch                              = require('node-fetch');
const https                              = require('https');

const USEHEROKU = true;
const APIURL = USEHEROKU ? 'https://tvde1-api.herokuapp.com/api/' : 'http://localhost:3000/api/'; //eslint-disable-line no-constant-condition

class Utils {
    constructor(client) {
        this.client = client;
        this.addToPrototypes();
        this.getApiToken(client.config.api.username, client.config.api.password)
            .then(key => {
                this.apikey = key;
            })
            .catch(error => {
                client.logger.error('Utils', `Could not get API token: ${error.message}`);
            });
    }

    /**
     * Returns a nicer output than 'true' or 'false'.
     * @param {boolean} cond 
     */
    niceBool(cond) {
        return cond ? 'Yes.' : 'No.';
    }

    /**
     * Replaces all occurences of 'whatText' with 'withText'.
     * @param {string} text The text. 
     * @param {string} whatText What to replace.
     * @param {string} withText What to replace with.
     */
    replaceAll(text, whatText, withText) {
        text = text.replace(whatText, withText);
        return text.includes(whatText) ? this.ReplaceAll(text, whatText, withText) : text;
    }

    /**
     * Escapes special regex characters.
     * @param {string} str 
     */
    escapeStringRegExp(str) {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }

    /**
     * Capitalises the first letter of the string.
     * @param {string} text 
     */
    capitaliseFirstLetter(text) {
        const textArray = (text).split('');
        return textArray.shift().toUpperCase() + textArray.join('');
    }

    /**
     * If needed, adds a dot to the end of the sentence.
     * @param {string} text 
     */
    addDot(text) {
        text = text.trim();
        return '!.?~'.includes(text[text.length - 1]) ? text : `${text}.`;
    }

    /**
     * Returns true if a string is/has a url.
     * @param {string} value 
     */
    isURL(value) {
        return /^(https?:\/\/)?.+(\..+)?\.\w+(\/[^/]*)*$/.test(value);
    }

    /**
     * Adds functions to prototypes.
     */
    addToPrototypes() {
        const utils = this;

        Message.prototype.EmbedEdit = async function(title, description) {
            const embed = new MessageEmbed()
                .setColor(utils.embedColor)
                .setTitle(title)
                .setDescription(description);
    
            await this.edit(this.content, {embed});
        };

        Message.prototype.Success = async function() {
            await this.react('✅');
        };

        Message.prototype.Fail = async function() {
            await this.react('❌');
        };
    }
    
    /**
     * The selected color for embeds.
     */
    get embedColor() {
        return 'RANDOM';
    }
    
    /**
     * Deletes an amount of messages from this channel. 
     * @param {Channel} channel 
     * @param {number} number 
     */
    async deleteMyMessages(channel, number) {
        const msgs = await channel.messages.fetch({limit: 100});
        const myMessages = msgs.filterArray(x => x.author.id === this.client.user.id);
        myMessages.slice(0, number).forEach(x => x.delete());
    }
    
    /**
     * Gets an user in a guild/dm.
     * @param {Channel} channel 
     * @param {string} search 
     */
    async getUser(channel, search) {

        search = search.toLowerCase();
        switch (channel.type) {
            case 'text': {
                await channel.guild.members.fetch();
                return channel.guild.members.find(x => x.displayName.toLowerCase().includes(search) || x.user.username.toLowerCase().includes(search));
            }
            case 'dm': {
                if (channel.recipient.username.toLowerCase().includes(search)) return channel.recipient;
                else if (this.client.user.username.toLowerCase().includes(search)) return this.client.user;
                return null;
            }
            case 'group': {
                if (channel.recipients.toLowerCase().includes(search)) return channel.recipients.find(x => x.username.toLowerCase().includes(search));
                else if (this.client.user.username.toLowerCase().includes(search)) return this.client.user;
                return null;
            }
        }
    }
    
    /**
     * Gets an url from a message.
     * Copied from matmen's fbot.
     * @param {Message} message 
     * @param {string[]} args 
     */
    async getImagesFromMessage(message, args) {
        let imageURLs = [];
    
        for (const attachment of message.attachments.values()) imageURLs.push(attachment.url);
        if (args[0] !== '^')
            for (const value of args) {
                if (this.isURL(value)) imageURLs.push(value);
    
                if (/^<:.+:\d+>$/.test(value)) {
                    imageURLs.push(`https://cdn.discordapp.com/emojis/${value.match(/^<:.+:(\d+)>$/)[1]}.png`);
                }
    
                if (/^:.+:$/.test(value)) {
                    imageURLs.push(`https://cdn.discordapp.com/emojis/${value.match(/^:(.+):$/)[1]}.png`);
                }
            }
    
        if (imageURLs.length === 0) {
            const messages = await message.channel.messages.fetch({
                limit: 20
            });
    
            const messageAttachments = messages.filter(m => m.attachments.size > 0 && m.attachments.first().height && m.attachments.first().width);
            const messageEmbeds = messages.filter(m => m.embeds.length > 0 && m.embeds[0].type === 'image');
            let images = [];
    
            for (const messageAttachment of messageAttachments.array()) images.push({
                url: messageAttachment.attachments.first().url,
                createdTimestamp: messageAttachment.createdTimestamp
            });
    
            for (const messageEmbed of messageEmbeds.array()) images.push({
                url: messageEmbed.embeds[0].url,
                createdTimestamp: messageEmbed.createdTimestamp
            });
    
            images = images.sort((m1, m2) => m2.createdTimestamp - m1.createdTimestamp);
    
            imageURLs = images.map(i => i.url);
        }
    
        return imageURLs[0];
    }
    
    /**
     * Gets the last sent codeblock.
     * @param {Message[]} messages 
     */
    async getCode(messages) {
        messages = messages.sort((a,b) => b.createdTimestamp - a.createdTimestamp);
    
        const codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;
    
        for (const m of messages) {
            const groups = codeRegex.exec(m.content);
    
            if (groups && groups[1].length) {
                return groups[1];
            }
        }
    }

    async getApiToken(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        };

        if (USEHEROKU) {
            requestOptions['agent'] = new https.Agent({
                rejectUnauthorized: false
            });
        }

        let result = await fetch(`${APIURL}account/authenticate`, requestOptions);

        if (!result.ok) {
            throw new Error('Request failed.');
        }

        result = await result.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.token;
    }

    async fetchImageEndpointFromApi(endpoint, options) {
        
        const requestOptions = {
            headers: {
                'Authorization': `${this.apikey}`
            }
        };

        if (USEHEROKU) {
            requestOptions['agent'] = new https.Agent({
                rejectUnauthorized: false
            });
        }


        if (options) {
            requestOptions.method = 'POST';
            requestOptions.headers['Content-Type'] = 'application/json';

            requestOptions.body = JSON.stringify({
                images: options.images,
                args: options.args
            });
        }

        const result = await fetch(`${APIURL}image-manipulation/${endpoint}`, requestOptions);

        if (!result.ok) {
            throw new Error('Could not fetch result from API');
        } else {
            const body = await result.json();

            if (!body.success) {
                throw new Error(body.message);
            }

            return Buffer.from(body.image, 'base64');
        }
    }
}

module.exports = Utils;