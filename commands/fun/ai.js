const rp = require('request-promise');

exports.run = async (client, message, args) => {
    rp('http://api.program-o.com/v2/chatbot/?bot_id=6&format=json&say=' + args.join(' '))
        .then(body => {
            const talk = JSON.parse(body);
            message.EmbedEdit('🤖 Response!', talk.botsay);
        })
        .catch(() => {
            throw new Error('An error occured while getting the response.');
        });
};

exports.help = {
    name: 'ai',
    description: 'Let the robot man talk.',
    usage: 'ai'
};