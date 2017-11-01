const { Collection, Message } = require('discord.js');           //eslint-disable-line no-unused-vars
const ExtendedClient          = require('../extendedClient');    //eslint-disable-line no-unused-vars
const distance                = require('jaro-winkler');
const Command                 = require('../templates/command'); //eslint-disable-line no-unused-vars
const path                    = require('path'); 
const fs                      = require('fs');

class CommandHandler {

    /**
     * Creates a new commandhandler.
     * @param {ExtendedClient} client The active client.
     */
    constructor(client) {
        this._client   = client;
        this._commands = new Collection();
    }

    /**
     * Loads commands.
     */
    load() {
        this._commands.clear();
        for (const command of readDirR('commands')) {
            delete require.cache[require.resolve(`../${command}`)];
            const commandConstructor = require(`../${command}`);
            const comm = new commandConstructor(this._client);
            const category = command.split('\\')[1] || command.split('/')[1];
            comm.info.category = category;
            this._commands.set(comm.info.name.toLowerCase(), comm);
            this._client.logger.log('CommandLoader', `Loaded command ${comm.info.name}`);
        }
    }

    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     */
    async execute(message, autoCorrect = false) {
        const [cmd, ...args] = message.content.substring(this._client.config.prefix.length).split(' ');

        let command = this._commands.get(cmd.toLowerCase());
        if (!command) {
            if (!autoCorrect) {
                return; 
            }

            const closest = closestCommand(cmd, this._commands.keys());
            if (closest.distance >= 0.8) {
                command = this._commands.get(closest.command);
            }
        }

        try {
            await command.run(message, args);
        }
        catch (err) {
            message.EmbedEdit('Error', `❌ ${err.message}`);
        }
    }

    /**
     * @returns {Collection<String, Command>}
     */
    get commands() {
        return this._commands;
    }
} 

module.exports = CommandHandler;

const readDirR = (dir) => {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
        : dir;
};

const closestCommand = (target, list) => {
    let highest = 0, best;
    for (const key of list) {
        const dist = distance(target, key);
        if (dist > highest) {
            best = key;
            highest = dist;
        }
    }
    return { command: best, distance: highest };
};