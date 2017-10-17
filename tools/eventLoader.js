const fs             = require('fs');
const ExtendedClient = require('../extendedClient.js');

class EventLoader {

    /**
     * 
     * @param {ExtendedClient} client The client in use.
     */
    constructor(client) {
        this.client = client;
    }

    load() {
        fs.readdir('./events/', (err, files) => {
            if (err) return this.client.logger.error(err);
            files.forEach(file => {
                const eventName = file.split('.')[0];
                this.client.logger.log('EventLoader', `Loading event ${eventName}.`);
                const eventFunction = require(`../events/${file}`);
    
                this.client.on(eventName, (...args) => eventFunction.run(this.client, ...args));
            });
        });
    }
}

module.exports = EventLoader;
