const CommandInfo    = require('../../templates/commandInfo');
const Command        = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('glitchgif', 'Glitches a gif.', 'glitchgif'));
    }

    async run(message, args) {
        let image;
        try {
            image = await this.client.utils.getImagesFromMessage(message, args);
        } catch (err) {
            throw err;
        }

        image = await this.client.apiClient.fetchImageFromApi('other/datamosh', { args: { gif: image } });

        const text = this.client.config.api.url + '/temp/gif/' + image;

        message.channel.send(text).catch(e => {
            console.log(e); 
        });
    }
};
