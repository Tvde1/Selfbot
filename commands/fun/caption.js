const captionbot = require('../../tools/captionbot.js');

exports.run = async (client, message, args) => {
    let image = await client.tools.getImagesFromMessage(message, args);
    if (!image) throw new Error('Could not find an image in the last 100 messages.');

    captionbot(image, (err, result) => {
        if (err) throw err;
        message.EmbedEdit('🤖 Result:', 'I think ' + result);
    });
};

exports.help = {
    name: 'caption',
    description: 'Captions an image.',
    usage: 'caption <image>'
};