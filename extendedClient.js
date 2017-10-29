const { Client, Collection } = require('discord.js');              //eslint-disable-line no-unused-vars
const CommandStore           = require('./tools/commandStore.js');
const EventLoader            = require('./tools/eventLoader.js');
const Logger                 = require('./tools/extendedLogger');
const Utils                  = require('./tools/utils.js');

class ExtendedClient extends Client {
    constructor() {
        super();
        this._config       = readConfig();

        this._utils        = new Utils(this._config );
        this._logger       = new Logger(this.config.channels, this.utils);

        const eventLoader = new EventLoader(this);
        eventLoader.load();

        this._commandStore = new CommandStore(this.logger);
        this._commandStore.load();
    }

    /**
     * @returns {Logger}
     */
    get logger() {
        return this._logger;
    }

    /**
     * @returns {Utils}
     */
    get utils() {
        return this._utils;
    }

    /**
     * @returns {*}
     */
    get config() {
        return this._config;
    }

    /**
     * @returns {CommandStore}
     */
    get commands() {
        return this._commandStore;
    }

}

module.exports = ExtendedClient;

const readConfig = () => {
    return process.env.CONFIG_SELFBOT ? JSON.parse(process.env.CONFIG_SELFBOT) : require('./config.json');
};