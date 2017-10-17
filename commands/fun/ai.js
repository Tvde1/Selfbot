const rp = require('request-promise');
const Command = require('../../command');

class AiCommand extends Command {

    constructor() {
        super();

        this.help = {
            name: 'ai',
            description: 'Let the robot man talk.',
            usage: 'ai'
        };
    }

    async run(client, message, args) {
        rp('http://api.program-o.com/v2/chatbot/?bot_id=6&format=json&say=' + args.join('%20'))
            .then(body => {
                const talk = JSON.parse(body);
                message.EmbedEdit('🤖 Response!', talk.botsay);
            })
            .catch(() => {
                throw new Error('An error occured while getting the response.');
            });
    }
}

module.exports = AiCommand;