exports.run = async (client, message, args) => {

    let guild = false;

    if (args[0] === 'view') {
        message.EmbedEdit('Alright', JSON.stringify(client.settings));
    } else if (args[0] === 'set') {
        args.splice(0, 1);

        if (args[0] === 'guild') {
            if (!message.guild) return message.EmbedEdit('Error', 'Can\'t edit guild settings in dms.');
            guild = true;
            args.splice(0, 1);
        }

        const setting = guild ? `${args[0]}_guild` : args[0];

        if (!client.settings.hasOwnProperty(setting))
            return message.EmbedEdit('Error', 'No such setting.');

        const result = parseBoolean(args[1]);
        
        if (!guild) {
            client.settings[setting] = result;
        }
        else {
            if (result)
                client.settings[setting].push(message.guild.id);
            else
                client.settings[setting] = client.settings[setting].filter(x => x !== message.guild.id);
        }
        
        client.tools.saveSettings();
        return message.EmbedEdit('Sucess', `Changed ${guild ? 'guild' : 'global'} setting \`${setting}\` to \`${result}\``);
    }
};

exports.help = {
    name: 'settings',
    description: 'Edits settings.',
    usage: 'settings (view | set <guild> [setting] [value])'
};

const parseBoolean = (text) => {
    return ['1', 'true', 'yes', 'y', 'on', '+'].includes(text.toLowerCase());
};