const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');
const Nraw        = require('nraw');
const reddit      = new Nraw('Discord Selfbot by /u/Tvde1 (for emojipastas)');

class EmojipastaCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('emojipasta', 'Sends an embed with emojipasta.', 'emojipasta'));
    }

    async run(, message) {
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
            reddit.subreddit('emojipasta').random().exec((data) => {
                resolve(data[0].data.children[0].data.selftext.replace(/\\n/g, '\n'));
            });
        }
        catch (err) {
            resolve(null);
        }
    });
};