const imageUrl = 'config.imageurl';
const urlExists = require('url-exists');
const distance = require('jaro-winkler');

const keys = [
    ['lenny', '( ͡° ͜ʖ ͡°)'],
    ['ele', ':eye: :lips: :eye:'],
    ['twss', 'That\'s what she said.'],
    ['shrug', '¯\\\_(ツ)_/¯'],
    ['fap', ':ok_hand:    .       :weary:\r\n   :eggplant: :zzz: :necktie: :eggplant:\r\n                   :oil: .   :nose:\r\n                 :zap: :8ball: :heavy_minus_sign:  :punch: :heavy_minus_sign:  :regional_indicator_d:  :sweat_drops:\r\n             :trumpet: .    :eggplant:                 :sweat_drops:\r\n             :boot:         :boot:'], ['sad', '\r\n\r\n ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀. .\r\n\⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⌒ \r\n\r\n'],
    ['notbad', '░░█▀░░░░░░░░░░░▀▀███████░░░░\r\n░░█▌░░░░░░░░░░░░░░░▀██████░░░\r\n░█▌░░░░░░░░░░░░░░░░███████▌░░\r\n░█░░░░░░░░░░░░░░░░░████████░░\r\n▐▌░░░░░░░░░░░░░░░░░▀██████▌░░\r\n░▌▄███▌░░░░▀████▄░░░░▀████▌░░\r\n▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░\r\n▐░▀░░═▐░░░░░░══░░▀░░░░▐▀░▄▀▌▌\r\n▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌\r\n▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌\r\n░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░\r\n░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░\r\n░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░\r\n░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░\r\n░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░\r\n░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░\r\n░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░\r\n░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░\r\n░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░\r\n▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░\r\n░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄\r\n░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░\r\n░░▄▌████████▄▄▄███████▌░░░░░▄\r\n░▄▀░██████████████████▌▀▄░░░░\r\n▀░░░█████▀▀░░░▀███████░░░▀▄░░\r\n░░░░▐█▀░░░▐░░░░░▀████▌░░░░▀▄░\r\n░░░░░░▌░░░▐░░░░▐░░▀▀█░░░░░░░▀\r\n░░░░░░▐░░░░▌░░░▐░░░░░▌░░░░░░░\r\n░╔╗║░╔═╗░═╦═░░░░░╔╗░░╔═╗░╦═╗░\r\n░║║║░║░║░░║░░░░░░╠╩╗░╠═╣░║░║░\r\n░║╚╝░╚═╝░░║░░░░░░╚═╝░║░║░╩═╝░'],
    ['xd', '😂                      😂        😂  😂\r\n    😂              😂            😂        😂\r\n        😂      😂                😂          😂\r\n                😂                        😂          😂\r\n        😂      😂                😂          😂\r\n    😂              😂            😂        😂\r\n😂                      😂        😂  😂']
];

exports.run = async (client, message) => {

    if (client.db && client.settings['logmessages'] && (message.channel.type === 'dm' || client.settings['logmessages_guild'].includes(message.channel.guild.id))) {
        client.db.addMessage(message);
    }

    if (!message.mentions.has(client.user)) {
        if (client.settings['logmentions'] && (message.channel.type === 'dm' || !client.settings.logmentions.includes(message.guild.id))) {
            const text =  message.guild
                ? `${message.guild.name} #${message.channel.name}`
                : message.author.username;
            client.log('mention', text, message.cleanContent, message.author);
        }
    }

    if (message.author.id !== client.user.id) return;

    if (/{.+}/.test(message.content)) editTag(message);
    if (/^:.+:$/.test(message.content)) editEmoji(message);

    if (!message.content.startsWith(client.config.prefix)) return;

    const [commandName, ...args] = message.content.slice(client.config.prefix.length).trim().split(' ');

    let command = client.commands.get(commandName);

    if (!command) {
        const closest = closestCommand(commandName, client.commands.keyArray());
        if (closest.distance > 0.8) {
            client.log('console', 'Corrected a command attempt.', '');
            command = client.commands.get(closest.command);
        }
    }

    if (!command) return;

    try {
        await command.run(client, message, args);
    }
    catch (err) {
        message.EmbedEdit('Error', `❌ ${err.message}`);
    }
};

const editTag = (message) => {
    let editString = message.content;
    keys.forEach(x => {
        const regex = new RegExp(`{${x[0]}}`,'gi');
        editString = editString.replace(regex, x[1]);
    });

    if (editString !== message.content) message.edit(editString);
};

const editEmoji = (message) => {
    const regex = /^:(.+):$/;
    const solution = regex.exec(message.content);
    const extentionarray = ['.png', '.gif', '.jpg', '.jpeg'];
    for (const index of extentionarray) {
        const emoji = imageUrl + solution[1] + index;
        urlExists(emoji, function(err, exists) {
            if (!exists) return;
            message.delete();
            message.channel.send({files:[emoji]});
            console.log('Swapped emoji for image.');
        });
    }
};

function closestCommand(target, list) {
    let highest = 0, best;
    for (const key of list) {
        const dist = distance(target, key);
        if (dist > highest) {
            best = key;
            highest = dist;
        }
    }
    return { command: best, distance: highest };
}