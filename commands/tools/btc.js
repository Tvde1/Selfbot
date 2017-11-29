const CommandInfo = require('../../templates/commandInfo');
const snekfetch   = require('snekfetch');
const Command     = require('../../templates/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, new CommandInfo('btc', 'How expensive are bitcoins now?.', 'btc'));
    }

    async run(message) {
        snekfetch.get('https://www.bitstamp.net/api/v2/ticker/btcusd/').then(r => {

            message.EmbedEdit('Success!', `BTC is now $${r.body.last}!`);
        });
    }
};