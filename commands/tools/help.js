const Command = require('../../command');

class HelpCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'help',
            description: 'Displays all the available commands for your permission level.',
            usage: 'help [command]'
        };
    }

    async run (client, message, args) {
        if (args[0]) {
            let command = args[0];
            if (client.commands.has(command)) {
                command = client.commands.get(command);
                message.channel.send(`= ${command.help.name} = \ndescription :: ${command.help.description}\nusage       :: ${command.help.usage}`, {
                    code: 'asciidoc',
                    split: {prepend: '```asciidoc\n', append: '```'}
                });
            }
        } else {
            const commandNames = Array.from(client.commands.getAll().keys());
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            message.channel.send(`= Command List =\n\nPrefix: "${client.config.prefix}"\n\n[Use ${client.config.prefix}help <commandname> for details]\n\n${client.commands.getAll().map(c => `${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {
                code: 'asciidoc',
                split: {prepend: '```asciidoc\n', append: '```'}
            });
        }
    }
}

module.exports = HelpCommand;