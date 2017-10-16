const ExtendedClient = require('./extendedClient.js');
const { Message }    = require('discord.js');

/**
 * Main command class
 * @abstract
 * @class
 */
class Command {

    constructor() {
        this._help = {};
    }

    /**
     * This is the main run method.
     * @param {ExtendedClient} client The currently active client. 
     * @param {Message} message The message this command reacts to.
     * @param {string[]} args The command's arguments.
     * @abstract
     */
    async run(client, message, args) {
        throw new Error('This command doesn\'t have a run() message.');
    }

    /**
     * Get help about command.
     */
    get help() {
        if (Object.keys(this._help).length === 0){
            console.log('xd');
            throw new Error('This command doesn\'t have a help set.');
        }
        return this._help;
    }

    set help(help) {
        this._help = help;
    }
}

module.exports = Command;