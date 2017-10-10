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
    client.settings = {};

    client.tools.saveSettings = () => {
        fs.writeFile('./settings.json', JSON.stringify(client.settings), (error) => {
            if (error) client.log('console', 'Error');
        });
    };

    client.tools.loadSettings = () => {
        fs.readFile('./settings.json', (err, data) => {
            if (err) {
                client.log('console', 'Could not find settings file so generated a new one.');

                const settings = ['logmessages', 'logmentions'];

                for (const s of settings) {
                    client.settings[s] = false;
                    client.settings[`${s}_guild`] = [];
                }
                
                client.tools.saveSettings();
                return;
            }
            client.settings = JSON.parse(data);
        });
    };
    client.tools.loadSettings();

    client.reloadCommands = () => {
        readDirR('commands').forEach(command => {
            delete require.cache[require.resolve(`../${command}`)];
            let props = require(`../${command}`);
            client.commands.set(props.help.name, props);
            client.log('console', `Loaded command ${props.help.name}`);
        });
    };

    function readDirR(dir) {
        return fs.statSync(dir).isDirectory()
            ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
            : dir;
    }

    client.log = (type, title, message, user) => {
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
                if (!mentionChannel) return client.log('console', `[Mention] ${message.cleanContent}`);
                if (!user) user = client.user;
                const embed = new discord.MessageEmbed()
                    .setColor(client.tools.EmbedColor)
                    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
                    .setTitle(title)
                    .setDescription(message);
                mentionChannel.send({embed});
                break;
            }
            case 'log': {
                const logChannel = client.channels.get(client.config.channels.logs);
                if (!logChannel) return client.log('console', `[Log] ${message}`);
                const embed = new discord.MessageEmbed()
                    .setColor(client.tools.EmbedColor)
                    .setAuthor(`${client.user.username} (${client.user.id})`, client.user.avatarURL())
                    .setTitle(title)
                    .setDescription(message);
                logChannel.send({embed});
                break;
            }
        }
    };

    client.tools.CapitaliseFirstLetter = (text) => {
        const textArray = (text).split('');
        return textArray.shift().toUpperCase() + textArray.join('');
    };

    client.tools.AddDot = (text) => {
        return '!,.?'.includes(text[text.length - 1]) ? text : text + '.';
    };

    client.tools.EmbedColor = 'RANDOM';

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
        return /^(https?:\/\/)?.+(\..+)?\.\w+(\/[^/]*)*$/.test(value);
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
            .setColor(client.tools.EmbedColor)
            .setTitle(title)
            .setDescription(description);

        await this.edit(this.content, {embed});
    };

    client.tools.getCode = async (messages) => {
        messages = messages.sort((a,b) => b.createdTimestamp - a.createdTimestamp);

        const codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;

        for (const m of messages) {
            const groups = codeRegex.exec(m.content);

            if (groups && groups[1].length) {
                return groups[1];
            }
        }
    };

    client.tools.fetchFromAPI = async (endpoint, options) => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const requestOptions = {
            agent,
            headers: {
                'Authorization': `Bearer ${client.config.fbotApiKey}`
            }
        };
        
        if (options) {
            requestOptions.method = 'POST';
            requestOptions.headers['Content-Type'] = 'application/json';

            requestOptions.body = JSON.stringify({
                images: options.images,
                args: options.args
            });
        }

        const result = await this.bot.fetch(`https://185.162.249.160:3000/${endpoint}`, requestOptions);

        if (!result.ok) {
            const body = await result.json();

            let error = new Error('Could not fetch result from API');
            if (body && body.meta && body.meta.error) error = new Error(body.meta.error.message);

            return Promise.reject(error);
        } else {
            const buffer = await result.buffer();
            return buffer;
        }
    };
};