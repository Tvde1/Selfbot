const discord = require('discord.js');

exports.run = function (client, message, args) {
    message.edit(args.join('👏'));
};

exports.help = {
    name: 'clap',
    description: 'Swaps spaces with 👏 emojis.',
    usage: 'clap [text]'
};