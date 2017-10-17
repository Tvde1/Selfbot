const Command = require('../../command');

class DiscrimCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'discrim',
            description: 'Shows all the names with the same discrim.',
            usage: 'discrim <discriminator>'
        };
    }

    async run (client, message, args) {
        let discrim = client.user.discriminator;
        if (args.length > 0) discrim = args[0];

        let users = [];
        for (const user of client.users.values())
            if (user.discriminator === discrim && !users.includes(user.tag)) users.push(user.tag);

        if (users.length === 0) return message.EmbedEdit('Found no users.', `Are you sure ${discrim} is a valid discriminator?\nFound 0 users.`);
        message.EmbedEdit(`Found ${users.length} users with the discriminator ${discrim}.`, `They are:\n\n${users.join('\n')}`);
    }
}

module.exports = DiscrimCommand;