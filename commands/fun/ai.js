const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');
const rp          = require('request-promise');

class AiCommand extends Command {

    constructor(client) {
        super(client, new CommandInfo('ai', 'Let the robot man talk.', 'ai'));
    }

    async run(message, args) {
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