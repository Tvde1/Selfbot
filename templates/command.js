const ExtendedClient = require('../extendedClient'); //eslint-disable-line no-unused-vars
const CommandInfo    = require('./commandInfo');
const { Message }    = require('discord.js');        //eslint-disable-line no-unused-vars

class Command {

    /**
     * Creates a new command. Must supply info.
     * @param {ExtendedClient} client The current client.
     * @param {CommandInfo} info The command's info. 
     */
    constructor(client, info) {
        if (!client || !(client instanceof Object)) { //TODO: This instanceof doesn't seem to work.
            throw new Error('You need to initialise a command with the ExtendedClient class.');
        }

        if (!info || !(info instanceof CommandInfo)) {
            throw new Error('You need to initialise a command with the CommandInfo class.');
        }

        this.client = client;
        this._info = info;
    }

    /**
     * Runs the command.
     * @param {ExtendedClient} client The active client.
     * @param {Message} message The received message.
     * @param {string[]} args The command's args.
     */
    async run(message, args) { //eslint-disable-line no-unused-vars
        throw new Error('This command does not have a run function.');
    }

    /**
     * @returns {CommandInfo}
     */
    get info() {
        return this._info;
    }
}

module.exports = Command;