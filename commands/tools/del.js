const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class DelCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('del', 'Deletes an amount of messages in the channel.', 'del [number]'));
    }

    async run(message, args) {
        if (isNaN(args[0]) || args[0] === ' ') throw new Error(`The correct syntax is \`${this.client.config.prefix}${this.info.usage}\`.`);
        const number = parseInt(args[0]);

        message.Success();

        this.client.utils.deleteMyMessages(message.channel, number + 1);
    }
}

module.exports = DelCommand;