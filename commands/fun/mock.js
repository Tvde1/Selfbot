const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('mock', 'Mocks an user\'s message.', 'mock [message id]'));
    }

    async run(message, args) {
        if (args.length === 0) {
            throw new Error(message, 'Error', 'You need to give it a message id.');
        }

        let msg;
        try {
            msg = await message.channel.messages.fetch(args[0]);
        }
        catch (err) {
            throw new Error('The message could not be found. Are you sure the ID is valid?');
        }
        let newMessage = '';

        for (let i = 0; i < msg.cleanContent.length; i++) {
            const randomNumber = Math.random();

            newMessage += randomNumber > 0.5
                ? msg.cleanContent[i].toUpperCase()
                : msg.cleanContent[i].toLowerCase();
        }

        if (message.guild && message.guild.id === '222078108977594368') {
            newMessage += ' <:spongeMyCock:313010878196875265>';
        }

        message.edit(newMessage);
    }
};
