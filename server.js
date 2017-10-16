const ExtendedClient = require('./extendedClient.js');
const client         = new ExtendedClient();
const mongoose       = require('mongoose');

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

client.login(client.config.token).catch(client.logger.error);