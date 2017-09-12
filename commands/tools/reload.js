exports.run = (client, message) => {
    client.reloadCommands();
    message.EmbedEdit('Done!', 'All commands reloaded.');
};

exports.help = {
    name: 'reload',
    description: 'Reloads a command that\'s been modified.',
    usage: 'reload [command]'
};