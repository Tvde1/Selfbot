exports.run = (client, message) => {
    message.channel.send({
        files: [{
            attachment: 'http://thecatapi.com/api/images/get?format=src&type=png',
            name: 'cat.png'
        }]
    });
};

exports.help = {
    name: 'randomcat',
    description: 'Sends a random cat.',
    usage: 'randomcat'
};