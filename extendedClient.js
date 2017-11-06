const CommandHandler = require('./helpers/commandHandler.js');
const ExtendedLogger = require('./helpers/extendedLogger');
const DatabaseClient = require('./helpers/databaseClient');
const EventHandler   = require('./helpers/eventHandler');
const { Client }     = require('discord.js');
const Utils          = require('./helpers/utils');

class ExtendedClient extends Client {
    constructor() {
        super();
        this._config         = readConfig();

        this._utils          = new Utils(this);
        this._logger         = new ExtendedLogger(this, this.utils);
        this._databaseClient = new DatabaseClient(this._config.databaseurl, this._logger);
        const eventLoader    = new EventHandler(this);
        this._commandHandler = new CommandHandler(this);

        eventLoader.load();
        this._commandHandler.load();
    }

    /**
     * @returns {ExtendedLogger}
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
     * @returns {CommandHandler}
     */
    get commandHandler() {
        return this._commandHandler;
    }

    /**
     * @returns {DatabaseClient}
     */
    get databaseClient() {
        return this._databaseClient;
    }
}

module.exports = ExtendedClient;

const readConfig = () => {
    return process.env.CONFIG_SELFBOT ? JSON.parse(process.env.CONFIG_SELFBOT) : require('./config.json');
};