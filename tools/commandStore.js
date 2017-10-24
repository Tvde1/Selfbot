const fs             = require('fs');
const path           = require('path');
const Logger         = require('./logger.js');   //eslint-disable-line no-unused-vars
const Command        = require('../command.js'); //eslint-disable-line no-unused-vars
const distance       = require('jaro-winkler');
const { Collection } = require('discord.js');

class CommandStore {
    /**
     * 
     * @param {ExtendedClient} client The currently active client. 
     */
    constructor(logger) {
        this.commands = new Collection();
        this.logger = logger;
    }

    /**
     * @param {string} name The command name.
     * @returns {Command} The found command.
     */
    get(name) {
        const command = this.commands.get(name);

        if (!command) {
            const closest = closestCommand(name, this.commands.keyArray());
            if (closest.distance > 0.8) {
                this.logger.log('MessageEvent', 'Corrected a command attempt.');
                return this.commands.get(closest.command);
            }
        }

        return command;        
    }

    /**
     * Checks if there exists a command with this name.
     * Use autocorrect to check for similar commands.
     * @param {string} name 
     * @param {boolean} autocorrect 
     */
    has(name, autocorrect = false) {
        if (this.commands.has(name)) {
            return true;
        }

        if (!autocorrect) {
            return false;
        }

        const result = closestCommand(name, this.commands.keyArray());
        return result.distance > 0.8;
    }

    /**
     * (Re)loads the commands/
     */
    load() {
        for (const command of readDirR('commands')) {
            delete require.cache[require.resolve(`../${command}`)];
            const commandConstructor = require(`../${command}`);
            const comm = new commandConstructor();
            this.commands.set(comm.help.name, comm);
            this.logger.log('CommandLoader', `Loaded command ${comm.help.name}`);
        }
    }

    getAll() {
        return this.commands;
    }
}

module.exports = CommandStore;

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