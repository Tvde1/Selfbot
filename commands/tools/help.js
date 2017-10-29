const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

class HelpCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('help', 'Displays all the available commands for your permission level.', 'help [command]'));
    }

    async run(message, args) {
        if (args[0]) {
            let command = args[0];
            if (this.client.commands.has(command)) {
                command = this.client.commands.get(command);
                message.channel.send(`= ${command.info.name} = \ndescription :: ${command.info.description}\nusage       :: ${command.info.usage}`, {
                    code: 'asciidoc',
                    split: {prepend: '```asciidoc\n', append: '```'}
                });
            }
        } else {
            const commandNames = Array.from(this.client.commands.getAll().keys());
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            message.channel.send(`= Command List =\n\nPrefix: "${this.client.config.prefix}"\n\n[Use ${this.client.config.prefix}help <commandname> for details]\n\n${this.client.commands.getAll().map(c => `${c.info.name}${' '.repeat(longest - c.info.name.length)} :: ${c.info.description}`).join('\n')}`, {
                code: 'asciidoc',
                split: {prepend: '```asciidoc\n', append: '```'}
            });
        }
    }
}

module.exports = HelpCommand;