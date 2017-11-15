const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('discrim', 'Shows all the names with the same discrim.', 'discrim <discriminator>'));
    }

    async run(message, args) {
        let discrim = this.client.user.discriminator;
        if (args.length > 0) discrim = args[0];

        let users = [];
        for (const user of this.client.users.values())
            if (user.discriminator === discrim && !users.includes(user.tag)) users.push(user.tag);

        if (users.length === 0) return message.EmbedEdit('Found no users.', `Are you sure ${discrim} is a valid discriminator?\nFound 0 users.`);
        message.EmbedEdit(`Found ${users.length} users with the discriminator ${discrim}.`, `They are:\n\n${users.join('\n')}`);
    }
};
