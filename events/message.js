const { Message, DMChannel, TextChannel } = require('discord.js');        //eslint-disable-line no-unused-vars
const ExtendedClient                      = require('../extendedClient'); //eslint-disable-line no-unused-vars
const urlExists                           = require('url-exists');

const keys = [
    ['lenny', '( ͡° ͜ʖ ͡°)'],
    ['ele', ':eye: :lips: :eye:'],
    ['twss', 'That\'s what she said.'],
    ['shrug', '¯\\\_(ツ)_/¯'], //eslint-disable-line no-useless-escape
    ['fap', ':ok_hand:    .       :weary:\r\n   :eggplant: :zzz: :necktie: :eggplant:\r\n                   :oil: .   :nose:\r\n                 :zap: :8ball: :heavy_minus_sign:  :punch: :heavy_minus_sign:  :regional_indicator_d:  :sweat_drops:\r\n             :trumpet: .    :eggplant:                 :sweat_drops:\r\n             :boot:         :boot:'], ['sad', '\r\n\r\n ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀. .\r\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⌒ \r\n\r\n'],
    ['notbad', '░░█▀░░░░░░░░░░░▀▀███████░░░░\r\n░░█▌░░░░░░░░░░░░░░░▀██████░░░\r\n░█▌░░░░░░░░░░░░░░░░███████▌░░\r\n░█░░░░░░░░░░░░░░░░░████████░░\r\n▐▌░░░░░░░░░░░░░░░░░▀██████▌░░\r\n░▌▄███▌░░░░▀████▄░░░░▀████▌░░\r\n▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░\r\n▐░▀░░═▐░░░░░░══░░▀░░░░▐▀░▄▀▌▌\r\n▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌\r\n▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌\r\n░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░\r\n░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░\r\n░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░\r\n░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░\r\n░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░\r\n░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░\r\n░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░\r\n░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░\r\n░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░\r\n▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░\r\n░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄\r\n░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░\r\n░░▄▌████████▄▄▄███████▌░░░░░▄\r\n░▄▀░██████████████████▌▀▄░░░░\r\n▀░░░█████▀▀░░░▀███████░░░▀▄░░\r\n░░░░▐█▀░░░▐░░░░░▀████▌░░░░▀▄░\r\n░░░░░░▌░░░▐░░░░▐░░▀▀█░░░░░░░▀\r\n░░░░░░▐░░░░▌░░░▐░░░░░▌░░░░░░░\r\n░╔╗║░╔═╗░═╦═░░░░░╔╗░░╔═╗░╦═╗░\r\n░║║║░║░║░░║░░░░░░╠╩╗░╠═╣░║░║░\r\n░║╚╝░╚═╝░░║░░░░░░╚═╝░║░║░╩═╝░'],
    ['xd', '😂                      😂        😂  😂\r\n    😂              😂            😂        😂\r\n        😂      😂                😂          😂\r\n                😂                        😂          😂\r\n        😂      😂                😂          😂\r\n    😂              😂            😂        😂\r\n😂                      😂        😂  😂']
];

/**
 * @param {ExtendedClient} client
 * @param {Message} message
 */
module.exports = async (client, message) => {

    sweepChannel(message.channel);

    if (message.mentions.has(client.user)) {
        if (!message.content) {
            client.logger.logMention(message);
        }
    }

    if (message.author.id !== client.user.id) return;

    if (message.content.includes(client.token) || message.content.includes(client.token.toString('base64')) || message.content.includes(client.token.toString('binary'))) {
        message.edit('what the fuck this contained my token');
        client.logger.log('Edited out token.');
    }

    if (/{.+}/.test(message.content)) editTag(message);
    if (/^:.+:$/.test(message.content)) editEmoji(client, message);

    if (!message.content.startsWith(client.config.prefix)) return;

    client.commandHandler.execute(message, true);
};

const editTag = (message) => {
    let editString = message.content;
    keys.forEach(x => {
        const regex = new RegExp(`{${x[0]}}`,'gi');
        editString = editString.replace(regex, x[1]);
    });

    if (editString !== message.content) message.edit(editString);
};

const editEmoji = (client, message) => {
    const regex = /^:(.+):$/;
    const solution = regex.exec(message.content);
    const extentionarray = ['.png', '.gif', '.jpg', '.jpeg'];
    for (const index of extentionarray) {
        const emoji = client.config.imageUrl + solution[1] + index;
        urlExists(emoji, (err, exists) => {
            if (!exists) return;
            message.delete();
            message.channel.send({files:[emoji]});
            client.logger.log('MessageEvent', 'Swapped emoji for image.');
        });
    }
};

/**
 * 
 * @param {DMChannel|TextChannel} channel 
 */
const sweepChannel = channel => {
    if (!channel.cachedImages) {
        channel.cachedImages = 0;
    }
    
    let amount = channel.messages.size - channel.cachedImages - 200;
    if (amount <= 0) {
        return;
    }

    for (const key of channel.messages.keyArray().reverse()) {
        const message = channel.messages.get(key);
        if (message.attachments.size !== 0) {
            channel.cachedImages++;
            continue;
        }
        message.channel.delete(key);
        amount--;

        if (amount === 0) {
            return;
        }
    }
};