const request = require('request-promise');
const discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (args.length < 1) throw new Error('Specify a username.');

    let body;
    try {
        body = await request('http://reddit.com/user/' + args[0] + '/about.json');
    }
    catch (err) {
        throw new Error('User not found.');
    }

    const info = JSON.parse(body);

    const embed = new discord.MessageEmbed()
        .setColor(client.tools.EmbedColor)
        .addField(':information_source: Username:', info.data.name, true)
        .addField(':1234: Link Karma:', info.data.link_karma, true)
        .addField(':1234: Comment Karma:', info.data.comment_karma, true)
        .addField(':moneybag: Has Gold:', client.tools.NiceBool(info.data.is_gold), true)
        .addField(':eye_in_speech_bubble: Is Mod:', client.tools.NiceBool(info.data.is_mod), true);

    message.edit(message.content, {embed});
};

exports.help = {
    name: 'reddit',
    description: '[username]',
    usage: 'Sends info about a reddit user.'
};