const request = require('request-promise');
const discord = require('discord.js');
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('reddit', '[username]', 'Sends info about a reddit user.'));
    }

    async run(message, args) {
        if (args.length < 1) {
            throw new Error('Specify a username.');
        }

        let body;
        try {
            body = await request('http://reddit.com/user/' + args[0] + '/about.json');
        }
        catch (err) {
            throw new Error('User not found.');
        }

        const info = JSON.parse(body);

        const embed = new discord.MessageEmbed()
            .setColor(this.client.utils.embedColor)
            .addField(':information_source: Username:', info.data.name, true)
            .addField(':1234: Link Karma:', info.data.link_karma, true)
            .addField(':1234: Comment Karma:', info.data.comment_karma, true)
            .addField(':moneybag: Has Gold:', this.client.utils.niceBool(info.data.is_gold), true)
            .addField(':eye_in_speech_bubble: Is Mod:', this.client.utils.niceBool(info.data.is_mod), true);

        message.edit(message.content, {embed});
    }
};
