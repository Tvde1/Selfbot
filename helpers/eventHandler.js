const ExtendedClient = require('../extendedClient.js'); //eslint-disable-line no-unused-vars
const fs             = require('fs');

class EventLoader {

    /**
     * @param {ExtendedClient} client The client in use.
     */
    constructor(client) {
        this._client = client;
    }

    /**
     * Loads all events.
     */
    load() {
        fs.readdir('./events/', (err, files) => {
            if (err) {
                return this._client.logger.error('EventHandler', err);
            }
            files.forEach(file => {
                const eventName = file.split('.')[0];
                this._client.logger.log('EventLoader', `Loading event ${eventName}.`);
                const eventFunction = require(`../events/${file}`);
    
                this._client.on(eventName, (...args) => eventFunction(this._client, ...args));
            });
        });
    }
}

module.exports = EventLoader;
