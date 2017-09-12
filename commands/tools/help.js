exports.run = (client, message, params) => {
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.channel.send(`= Command List =\n\nPrefix: "${client.config.prefix}"\n\n[Use ${client.config.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {
            code: 'asciidoc',
            split: {prepend: '```asciidoc\n', append: '```'}
        });
    } else {
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.send(`= ${command.help.name} = \ndescription :: ${command.help.description}\nusage       :: ${command.help.usage}`, {
                code: 'asciidoc',
                split: {prepend: '```asciidoc\n', append: '```'}
            });
        }
    }
};

exports.help = {
    name: 'help',
    description: 'Displays all the available commands for your permission level.',
    usage: 'help [command]'
};