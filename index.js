const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
client.config = require('./config.json');

require('./modules/clientaddons.js')(client);
process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));

//Command Loading
client.reloadCommands();

//Event loading
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventName = file.split('.')[0];
        client.log('console', `Loading event ${eventName}.`);
        const eventFunction = require(`./events/${file}`);

        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login(client.config.token).catch(console.err);