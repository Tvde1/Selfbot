const discord = require('discord.js');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const fetch = require('node-fetch');

const { Message } = discord;

module.exports = (client) => {

    client.tools = {};
    client.commands = new discord.Collection();

    function reloadCommands() {
        readDirR('commands').forEach(command => {
            delete require.cache[require.resolve(`../${command}`)];
            let props = require(`../${command}`);
            client.commands.set(props.help.name, props);
            client.log('console', `Loaded command ${props.help.name}`);
        });
    }

    client.reloadCommands = reloadCommands;

    function readDirR(dir) {
        return fs.statSync(dir).isDirectory()
            ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
            : dir;
    }

    function log(type, title, message, user) {
        if (!message) {
            message = title;
            title = '';
        }
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        switch (type) {
            case 'console': {
                console.log(`${time} | ${title}${message ? ' ' + message : ''}`);
                break;
            }
            case 'mention': {
                const mentionChannel = client.channels.get(client.config.channels.mentions);
                if (!mentionChannel) return log('console', `[Mention] ${message.cleanContent}`);
                if (!user) user = client.user;
                const embed = new discord.MessageEmbed()
                    .setColor(embedColor)
                    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
                    .setTitle(title)
                    .setDescription(message);
                mentionChannel.send({embed});
                break;
            }
            case 'log': {
                const logChannel = client.channels.get(client.config.channels.logs);
                if (!logChannel) return log('console', `[Log] ${message}`);
                const embed = new discord.MessageEmbed()
                    .setColor(embedColor)
                    .setAuthor(`${client.user.username} (${client.user.id})`, client.user.avatarURL())
                    .setTitle(title)
                    .setDescription(message);
                logChannel.send({embed});
                break;
            }
        }
    }

    client.log = log;

    client.tools.CapitaliseFirstLetter = (text) => {
        const textArray = (text).split('');
        return textArray.shift().toUpperCase() + textArray.join('');
    };

    client.tools.AddDot = (text) => {
        return '!,.?'.includes(text[text.length - 1]) ? text : text + '.';
    };

    const embedColor = 'RANDOM'; //'ff0000';
    client.tools.EmbedColor = embedColor;

    client.tools.DeleteMyMessages = (client, channel, number) => {
        channel.messages.fetch({limit: 100}).then(messages => {
            const myMessages = messages.filterArray(x => x.author.id === client.user.id);
            myMessages.slice(0, number).forEach(x => x.delete());
        });
    };

    client.tools.GetUser = async (client, channel, search) => {
        search = search.toLowerCase();
        switch (channel.type) {
            case 'text': {
                await channel.guild.members.fetch();
                return channel.guild.members.find(x => x.displayName.toLowerCase().includes(search) || x.user.username.toLowerCase().includes(search));
            }
            case 'dm': {
                if (channel.recipient.username.toLowerCase().includes(search)) return channel.recipient;
                else if (client.user.username.toLowerCase().includes(search)) return client.user;
                return null;
            }
            case 'group': {
                if (channel.recipients.toLowerCase().includes(search)) return channel.recipients.find(x => x.username.toLowerCase().includes(search));
                else if (client.user.username.toLowerCase().includes(search)) return client.user;
                return null;
            }
        }
    };

    client.tools.NiceBool = (cond) => {
        return cond ? 'Yes.' : 'No.';
    };

    client.tools.ReplaceAll = (text, whatText, withText) => {
        text = text.replace(whatText, withText);
        return text.includes(whatText) ? this.ReplaceAll(text, whatText, withText) : text;
    };

    client.tools.EscapeStringRegExp = (str) => {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    };

    client.tools.Download = function (uri, filename, callback) {
        request.head(uri, function (err, res) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(window.fs.createWriteStream(filename)).on('close', callback);
        });
    };

    const urlRegex = /((?:https?:\/\/)?(?:[a-z\d\-]+\.)+[a-z]{2,6}\/[^\s]+\.(?:png|jpe?g|gif))/gi;
    client.tools.UrlRegex = urlRegex;

    client.tools.getImagesFromMessage = async (message, args) => {
        let imageURLs = [];

        for (const attachment of message.attachments.values()) imageURLs.push(attachment.url);
        if (args[0] !== '^')
            for (const value of args) {
                if (isURL(value)) imageURLs.push(value);

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
    };

    const isURL = (value) => {
        return /^(https?:\/\/)?.+(\..+)?\.\w+(\/[^\/]*)*$/.test(value);
    };

    const getLastImage = (messages) => {
        messages = messages.array().slice(-100);
        let filteredMessages = messages.filter(x => x.attachments.size > 0 || urlRegex.test(x.content));
        filteredMessages = filteredMessages.sort(function (a, b) {
            return a.createdAt - b.createdAt;
        });
        if (filteredMessages.length === 0) {
            return null;
        }
        const message = filteredMessages[filteredMessages.length - 1];
        if (message.attachments.size !== 0) {
            return message.attachments.first().url;
        }
        const url = urlRegex.exec(message.content);
        return url[1];
    };

    client.tools.GetImageFromChannel = async (channel) => {
        const url = getLastImage(channel.messages);
        if (url) return url;

        if (channel.messages.size >= 100) {
            return null;
        }

        await channel.messages.fetch({limit: 100});
        return getLastImage(channel.messages);
    };

    client.tools.getBufferFromJimp = (img, mime) => {
        return new Promise(async (resolve, reject) => {

            if (img.bitmap.width > 1024 || img.bitmap.height > 1024) img = await img.scaleToFit(1024, 1024);

            img.getBuffer(mime || jimp.MIME_PNG, (err, buffer) => {
                if (err) reject(err);
                resolve(buffer);
            });
        });
    };

    const getImageBuffer = (image, mime) => {

        return new Promise(async resolve => {

            if (!image) return resolve(new Error('No image returned'));

            if (image.bitmap.width > 1024 || image.bitmap.height > 1024) image = await image.scaleToFit(1024, 1024);

            image.getBuffer(mime || jimp.MIME_PNG, (err, buffer) => {

                resolve(err || buffer);

            });

        });
    };

    client.tools.detectFaces = async (image) => {
        for (const token of client.config.oxfordTokens) {
            const facesRequest = await fetch('https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=headPose', {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': token,
                    'Content-Type': 'application/octet-stream'
                },
                body: await getImageBuffer(image)
            });

            if (!facesRequest.ok) continue;

            const faces = await facesRequest.json();
            if (!faces.length) return new Error('No faces detected');
            return faces;
        }
        return new Error('There was an unexpected API error');
    };

    Message.prototype.EmbedEdit = async function(title, description) {
        const embed = new discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(title)
            .setDescription(description);

        await this.edit(this.content, {embed});
    };

    client.tools.getCode = async (messages) => {
        messages = messages.sort((a,b) => b.createdTimestamp - a.createdTimestamp);

        const codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;
        // const codeRegex = /(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;

        for (const m of messages) {
            const groups = codeRegex.exec(m.content);

            if (groups && groups[1].length) {
                return groups[1];
            }
        }
    };
};