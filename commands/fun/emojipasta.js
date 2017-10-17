const Nraw = require('nraw');
const reddit = new Nraw('Discord Selfbot by /u/Tvde1 (for emojipastas)');
const Command = require('../../command');

class EmojipastaCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'emojipasta',
            description: 'Sends an embed with emojipasta.',
            usage: 'emojipasta'
        };
    }

    async run (client, message) {
        let text = await getPost();
        while (!text || text === '' || text.length > 2000) {
            text = await getPost();
        }

        message.EmbedEdit('Emojipasta', text);
    }
}

module.exports = EmojipastaCommand;

const getPost = async () => {
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
};