const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = new class extends Command {

    constructor(client) {
        super(client, new CommandInfo('help', 'Displays all the available commands for your permission level.', 'help [(category) | command [command)]'));
    }

    async run(message, args) {
        if (args[0]) {
            if (args[0] === 'command') {
                if (!this.client.commandHandler.commands.has(args[1])) {
                    return message.Fail();
                }

                const command = this.client.commandHandler.commands.get(args[1]);
                message.channel.send(`= ${command.info.name} = \ndescription :: ${command.info.description}\nusage       :: ${command.info.usage}`, {
                    code: 'asciidoc',
                    split: {prepend: '```asciidoc\n', append: '```'}
                });
                return;
            }

            const categoryCommands = this.client.commandHandler.commands.filter(c => c.info.category === args[0]);
            if (categoryCommands.size === 0) {
                return message.Fail();
            }

            const commandNames = categoryCommands.keyArray();
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            message.channel.send(`= Command List =\n\nPrefix: "${this.client.config.prefix}"\n\n[Use ${this.client.config.prefix}help [commandname] for details]\n\n${categoryCommands.map(c => `${c.info.name}${' '.repeat(longest - c.info.name.length)} :: ${c.info.description}`).join('\n')}`, {
                code: 'asciidoc',
                split: { prepend: '```asciidoc\n', append: '```' }
            });

            return;
        }
        
        const categories = [];
        for (let comm of this.client.commandHandler.commands.values()) {
            if (!categories.includes(comm.info.category)) {
                categories.push(comm.info.category);
            }
        }

        message.channel.send(`= Category List =\n\nPrefix: "${this.client.config.prefix}"\n\n${categories.join('\n')}`, {
            code: 'asciidoc',
            split: { prepend: '```asciidoc\n', append: '```' }
        });
    }
};
