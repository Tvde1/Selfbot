const Nraw = require('nraw');
const reddit = new Nraw('Discord Selfbot by /u/Tvde1 (for emojipastas)');

exports.run = async (client, message) => {

    let text = await getPost();
    while (!text || text === '' || text.length > 2000) {
        text = await getPost();
    }

    message.EmbedEdit('Emojipasta', text);
    // client.EmbedEdit(message, 'Error', 'emojipasta\uD83D\uDC4C failed\uD83D\uDE14\uD83D\uDE21\uD83D\uDEAB to \u274Cload\u274C!! \uD83D\uDE2D try again \uD83D\uDD50 later \u2705 please \uD83D\uDC4B');
};

async function getPost() {
    return new Promise(resolve => {
        try {
            reddit.subreddit('emojipasta').random().exec(function (data) {
                resolve(data[0].data.children[0].data.selftext.replace(/\\n/g, '\n'));
            });
        }
        catch (err) {
            resolve(null);
        }
    });
}

exports.help = {
    name: 'emojipasta',
    description: 'Sends an embed with emojipasta.',
    usage: 'emojipasta'
};