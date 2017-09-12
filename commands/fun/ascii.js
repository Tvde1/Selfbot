const request = require('request');

exports.run = (client, message, args) => {

    if (args.length === 0) throw new Error('You need to tell me what to say...')

    request('http://artii.herokuapp.com/make?text=' + args.join(' '), function (error, response, body) {
        message.edit(body, { code: true });
    });
};

exports.help = {
    name: 'ascii',
    description: 'Edits the message with a code block with the text in ascii-art.',
    usage: 'ascii [text]'
};