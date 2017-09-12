const imageUrl = 'config.imageurl';
const urlExists = require('url-exists');
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

    if (message.mentions.has(client.user), false) {
        const text =  message.guild
            ? `${message.guild.name} #${message.channel.name}`
            : message.author.username;
        client.log('mention', text, message.cleanContent, message.author);
    }

    if (message.author.id !== client.user.id) return;

    if (/{.+}/.test(message.content)) editTag(message);
    if (/:.+:/.test(message.content)) editEmoji(message);

    if (!message.content.startsWith(client.config.prefix)) return;

    const [commandName, ...args] = message.content.slice(client.config.prefix.length).trim().split(' ');

    if (!client.commands.has(commandName)) return;

    try {
        await client.commands.get(commandName).run(client, message, args);
    }
    catch (err) {
        message.EmbedEdit('Error', `❌ ${err.message}`);
    }
};

editTag = (message) => {
    let editString = message.content;
    keys.forEach(x => {
        const regex = new RegExp(`{${x[0]}}`,'gi');
        editString = editString.replace(regex, x[1]);
    });

    if (editString !== message.content) message.edit(editString);
};

editEmoji = (message) => {
    const regex = /:(.+):/;
    const solution = regex.exec(message.content);
    const extentionarray = ['.png', '.gif', '.jpg', '.jpeg'];
    for (let index in extentionarray) {
        const emoji = imageUrl + solution[1] + extentionarray[index];
        urlExists(emoji, function(err, exists) {
            if (!exists) return;
            message.delete();
            message.channel.send({files:[emoji]});
            console.log('Swapped emoji for image.');
        });
    }
};