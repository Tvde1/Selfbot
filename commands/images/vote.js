const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('vote', 'Start a vote.', 'vote (text)'));
    }

    async run(message, args) {
        const username = message.author.username;

        if (args.length === 0) throw new Error('No text found.');
        const text = args.join(' ');
        
        let image = await this.client.apiClient.fetchImageFromApi('other/vote', { args: { username, text }} );

        const newM = await message.channel.send({
            files: [{
                attachment: image,
                name: 'vote.png'
            }]
        });

        await newM.react('✅');
        await newM.react('❌');
    }   
};
