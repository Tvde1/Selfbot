const Logger         = require('./tools/logger');
const Settings       = require('./tools/settings.js');
const Utils          = require('./tools/utils.js');
const DiscordUtils   = require('./tools/discordUtils.js');
const CommandStore  = require('./tools/commandStore.js');
const EventLoader    = require('./tools/eventLoader.js');
const { Client, Collection } = require('discord.js');

class ExtendedClient extends Client {
    constructor() {
        super();

        this._config       = readConfig();

        this._utils        = new Utils();
        this._discordUtils = new DiscordUtils(this.utils);
        this._logger       = new Logger(this.config.channels, this.utils);
        this._settings     = new Settings(this.logger);

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
     * @returns {DiscordUtils}
     */
    get discordUtils() {
        return this._discordUtils;
    }

    /**
     * @returns {Settings}
     */
    get settings() {
        return this._settings;
    }

    /**
     * @returns {*}
     */
    get config() {
        return this._config;
    }

    // /**
    //  * @private
    //  */
    // set config(n) {
    //     this._config = n;
    // }

    /**
     * @returns {CommandStore}
     */
    get commands() {
        return this._commandStore;
    }

}

module.exports = ExtendedClient;

const readConfig = () => {
    return process.env.SELFBOT_CONFIG ? JSON.parse(process.env.SELFBOT_CONFIG) : require('./config.json');
};