const games = require('../games.json');

module.exports = client => {
    client.logger.log('Bot is ready.');
    delete client.user.email;
    // delete client.token;
    client.faketoken = rtoken();

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

/* This all is stolen from some random guy at the d.js guild. */
const rndID = () => {
    return ((Date.now() - 1420070400000) * 4194304).toFixed();
};

const btoa = (str) => {
    return new Buffer(str).toString('base64');
};

const rtoken = () => {
    let current = '';
    const a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const b = ['_', '-'];

    current += btoa(rndID()) + '.' + 'C';
    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            current += Math.round(Math.random() * 9);
        } else {
            current += (Math.random() > 0.4) ? a[Math.round(Math.random() * 25)].toUpperCase() : (Math.random() > 0.9) ? b[Math.round(Math.random())] : a[Math.round(Math.random() * 25)];
        }
    }
    current += '.';
    for (let i = 0; i < 27; i++) {
        if (Math.random() > 0.4) {
            current += a[Math.round(Math.random() * 25)].toUpperCase();
        } else {
            if (Math.random() > 0.3) {
                current += a[Math.round(Math.random() * 25)];
            } else {
                if (Math.random() > 0.5) {
                    current += b[Math.round(Math.random())];
                } else {
                    current += Math.round(Math.random() * 9);
                }
            }
        }
    }

    return current;
};