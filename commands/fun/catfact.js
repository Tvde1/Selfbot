const catFacts = require('cat-facts');

exports.run = (client, message) => {
    message.EmbedEdit('🐱 Catfact:', client.tools.AddDot(catFacts.random()));
};

exports.help = {
    name: 'catfact',
    description: 'Sends a nice catfact.',
    usage: 'catfact'
};