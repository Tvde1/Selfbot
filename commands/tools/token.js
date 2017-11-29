const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');
const { get }     = require('snekfetch');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('token', 'Checks token info.', 'token <token>'));
    }

    async run(message, args) {
        if (args.length === 0) {
            throw new Error('Missing token argument.');
        }

        const token = args[0];

        try {
            let body;
            try {
                body = (await get('https://discordapp.com/api/v7/users/@me')
                    .set('Authorization', `Bot ${token}`)).body;
            } catch (err) {
                body = (await get('https://discordapp.com/api/v7/users/@me')
                    .set('Authorization', token)).body;
            }

            const info = [
                'Valid Token!',
                `From: ${message.author.tag}`,
                `Tag: ${body.username}#${body.discriminator}`,
                `ID: ${body.id}`
            ];
            if (body.email) { 
                info.push(`Email: ${body.email}`);
            }
            if (body.phone) {
                info.push(`Phone: ${body.phone}`);
            }
            message.channel.send(info.join('\n'));
        } catch (err) {
            if (err.status === 401) {
                throw new Error('Invalid Token');
            }
        }
    }
};