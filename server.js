const ExtendedClient = require('./extendedClient');
const client         = new ExtendedClient();
const mongoose       = require('mongoose');

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://i deleted xd/logs', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', x => client.logger.error('Database', `Mongoose connection error: ${x}`));
db.once('open', () => {
    client.db = mongoose.connection;
    client.logger.log('Database', 'Connected to database.');
    require('./tools/mongooseStuff.js')(client.db);
});

client.login(client.config.token).catch(client.logger.error);