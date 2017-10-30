const ExtendedClient = require('./extendedClient');
const client         = new ExtendedClient();

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));

client.login(client.config.token).catch(client.logger.error);