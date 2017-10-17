const games = require('../games.json');

exports.run = (client) => {
    client.logger.log('Bot is ready.');
    delete client.user.email;

    setInterval(() => {
        client.logger.log('Changing game.');
        const game = games[Math.floor(Math.random() * games.length)];
        client.user.setPresence({
            activity: {
                type: game[0],
                name: game[1]
            }
        });
    }, 1000 * 60 * 60);
};