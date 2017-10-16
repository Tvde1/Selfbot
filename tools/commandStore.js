const fs             = require('fs');
const path           = require('path');
const Logger         = require('./logger.js');
const Command        = require('../command.js');
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

    load() {
        for (const command of this.readDirR('commands')) {
            delete require.cache[require.resolve(`../${command}`)];
            const commandConstructor = require(`../${command}`);
            this.logger.log('Tryna get command: ' + command);
            const comm = new commandConstructor();
            this.commands.set(comm.help.name, comm);
            this.logger.log('CommandLoader', `Loaded command ${comm.help.name}`);
        }
    }

    readDirR(dir) {
        return fs.statSync(dir).isDirectory()
            ? Array.prototype.concat(...fs.readdirSync(dir).map(f => this.readDirR(path.join(dir, f))))
            : dir;
    }
}

module.exports = CommandStore;

function closestCommand(target, list) {
    let highest = 0, best;
    for (const key of list) {
        const dist = distance(target, key);
        if (dist > highest) {
            best = key;
            highest = dist;
        }
    }
    return { command: best, distance: highest };
}