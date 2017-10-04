const discord  = require('discord.js');
const fs       = require('fs');
const mongoose = require('mongoose');
const client   = new discord.Client();
client.config  = require('./config.json');

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://i deleted xd/logs', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', x => client.log('console', `Mongoose connection error: ${x}`));
db.once('open', () => {
    client.db = mongoose.connection;
    client.log('console', 'Connected to database.');
    require('./tools/mongooseStuff.js')(client.db);
});

require('./tools/clientaddons.js')(client);

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

//Command Loading
client.reloadCommands();

client.login(client.config.token).catch(console.err);