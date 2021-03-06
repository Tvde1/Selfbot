const { Channel, Message, MessageEmbed } = require('discord.js');        //eslint-disable-line no-unused-vars
const ExtendedClient                     = require('../extendedClient'); //eslint-disable-line no-unused-vars

class Utils {
    /**
     * @param {ExtendedClient} client 
     */
    constructor(client) {
        this.client = client;
        this.addToPrototypes();
    }

    executeAfterReady() {
        setInterval(() => sweepOldMessages(this.client), 1000 * 60);
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
     * @param {String} text The text. 
     * @param {String} whatText What to replace.
     * @param {String} withText What to replace with.
     */
    replaceAll(text, whatText, withText) {
        text = text.replace(whatText, withText);
        return text.includes(whatText) ? this.ReplaceAll(text, whatText, withText) : text;
    }

    /**
     * Escapes special regex characters.
     * @param {String} str 
     */
    escapeStringRegExp(str) {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }

    /**
     * Capitalises the first letter of the string.
     * @param {String} text 
     */
    capitaliseFirstLetter(text) {
        const textArray = text.split('');
        return textArray.shift().toUpperCase() + textArray.join('');
    }

    /**
     * If needed, adds a dot to the end of the sentence.
     * @param {String} text 
     */
    addDot(text) {
        text = text.trim();
        return '!.?~'.includes(text[text.length - 1]) ? text : `${text}.`;
    }

    /**
     * Returns true if a string is/has a url.
     * @param {String} value 
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
        return 'BLURPLE';
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
     * @param {String} search
     * @returns {User|GuildMember}
     */
    async getUser(channel, search) {
        search = search.toLowerCase();
        switch (channel.type) {
            case 'text': {
                await channel.guild.members.fetch();
                return channel.guild.members.find(x => x.displayName.toLowerCase().includes(search) || x.user.username.toLowerCase().includes(search));
            }
            case 'dm': {
                if (channel.recipient.username.toLowerCase().includes(search)) {
                    return channel.recipient;
                }
                else if (this.client.user.username.toLowerCase().includes(search)) {
                    return this.client.user;
                }
                return null;
            }
            case 'group': {
                if (channel.recipients.toLowerCase().includes(search)) {
                    return channel.recipients.find(x => x.username.toLowerCase().includes(search));
                }
                else if (this.client.user.username.toLowerCase().includes(search)) {
                    return this.client.user;
                }
                return null;
            }
        }
    }
    
    /**
     * Gets an url from a message.
     * Copied from matmen's fbot.
     * @param {Message} message 
     * @param {String[]} args 
     */
    async getImagesFromMessage(message, args) {
        let imageURLs = [];
    
        for (const attachment of message.attachments.values()) {imageURLs.push(attachment.url);}
        if (args[0] !== '^') {
            for (const value of args) {
                if (this.isURL(value)) {imageURLs.push(value);}
    
                if (/^<:.+:\d+>$/.test(value)) {
                    imageURLs.push(`https://cdn.discordapp.com/emojis/${value.match(/^<:.+:(\d+)>$/)[1]}.png`);
                }
    
                if (/^:.+:$/.test(value)) {
                    imageURLs.push(`https://cdn.discordapp.com/emojis/${value.match(/^:(.+):$/)[1]}.png`);
                }
            }
        }
    
        if (imageURLs.length === 0) {
            const messages = await message.channel.messages.fetch({
                limit: 20
            });
    
            const messageAttachments = messages.filter(m => m.attachments.size > 0 && m.attachments.first().height && m.attachments.first().width);
            const messageEmbeds = messages.filter(m => m.embeds.length > 0 && m.embeds[0].type === 'image');
            let images = [];
    
            for (const messageAttachment of messageAttachments.array()) {
                images.push({
                    url: messageAttachment.attachments.first().url,
                    createdTimestamp: messageAttachment.createdTimestamp
                });
            }
    
            for (const messageEmbed of messageEmbeds.array()) {
                images.push({
                    url: messageEmbed.embeds[0].url,
                    createdTimestamp: messageEmbed.createdTimestamp
                });
            }
    
            images = images.sort((m1, m2) => m2.createdTimestamp - m1.createdTimestamp);
    
            imageURLs = images.map(i => i.url);
        }
    
        if (imageURLs.length === 0) {
            throw new Error('No images found.');
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
}

const sweepOldMessages = client => {
    const lifetimeMs = 1000 * (1000 * 60 * 60);
    const now = Date.now();

    for (const channel of client.channels.values()) {
        if (!channel.messages) {
            continue;
        }
  
        let amount = channel.messages.size - channel.cachedImages - 200;
 
        if (!channel.cachedImages) {
            channel.cachedImages = 0;
        }

        for (const message of Array.from(channel.messages.values()).reverse()) {
            if (message.attachments.size !== 0) {
                channel.cachedImages++;
                continue;
            }

            if (now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs) {
                channel.messages.delete(message.id);
                amount++;
            } else {
                if (amount > 0) {
                    channel.messages.delete(message.id);
                    amount++;
                } else {
                    break;
                }
            }
        }
    }
};

module.exports = Utils;