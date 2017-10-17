const discord = require('discord.js');
const util = require('util');
const mongoose = require('mongoose');
const pa = require('../../tools/property-autocorrect.js');
const Command = require('../../command');

class EvalCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'eval',
            description: 'Evaluates arbitrary javascript.',
            usage: 'eval [...code]'
        };
    }

    async run (client, message, args) {
        if (args.length < 1) throw new Error('Eval something lol');
        let match;
        let async = false;

        if (args[0] === 'async') {
            async = true;
            args.shift();
            match = args.join(' ');
        }
        else match = args.join(' ');

        if(async) await evalAsync(client, message, match);
        else await evalSync(client, message, match);
    }
}

module.exports = EvalCommand;

const evalSync = async (_client, _message, match) => {
    const start = process.hrtime();
    let diff, evaled, response;

    const client = pa(_client);
    const message = pa(_message);

    try {
        evaled = eval(match);
        diff = process.hrtime(start);
    } catch (error) {
        diff = process.hrtime(start);
        response = error.message;
        _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:warning: Error:**\n\`\`\`xl\n${response}\n\`\`\`\n**Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
        return;
    }

    const type = typeof (evaled);
    response = evaled;
    if (type === 'object') {
        try {
            response = util.inspect(evaled, {depth: 1});
        }
        catch (err) {
            console.log(`Error while stringifying: ${err.message}`);
        }
    }

    if (response && response.toString().includes(_client.token))
        response = response.replace(_client.token, rtoken(1)[0]);

    await _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);

    if (evaled && typeof (evaled.then) === 'function') {
        evaled.then(promiseResult => {
            diff = process.hrtime(start);
            if (typeof promiseResult === 'object') {
                try {
                    promiseResult = util.inspect(promiseResult, {depth: 0});
                }
                catch (err) {
                    //Ignored
                }
            }
            _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**:white_check_mark: Promise:**\n\`\`\`xl\n${promiseResult}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
        })
            .catch(err => {
                _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**:warning: Promise Error:**\n\`\`\`xl\n${err}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
            });
    }
};

const evalAsync = async (_client, _message, match) => {
    const start = process.hrtime();
    let diff, evaled, response;

    const client = pa(_client);
    const message = pa(_message);

    try {
        evaled = await eval('(async() => {\n' + match +'\n})();');
        await evaled;
        diff = process.hrtime(start);
    } catch (error) {
        diff = process.hrtime(start);
        response = error.message;
        _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:warning: Error:**\n\`\`\`xl\n${response}\n\`\`\`\n**Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
        return;
    }

    const type = typeof (evaled);
    response = evaled;
    if (type === 'object') {
        try {
            response = util.inspect(evaled, {depth: 1});
        }
        catch (err) {
            console.log(`Error while stringifying: ${err.message}`);
        }
    }

    if (response && response.toString().includes(_client.token))
        response = response.replace(_client.token, rtoken(1)[0]);

    await _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);

    if (evaled && typeof (evaled.then) === 'function') {
        evaled.then(promiseResult => {
            diff = process.hrtime(start);
            if (typeof promiseResult === 'object') {
                try {
                    promiseResult = util.inspect(promiseResult, {depth: 0});
                }
                catch (err) {
                    //Ignored
                }
            }
            _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**:white_check_mark: Promise:**\n\`\`\`xl\n${promiseResult}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
        })
            .catch(err => {
                _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Output:**\n\`\`\`js\n${response}\n\`\`\`\n**:warning: Promise Error:**\n\`\`\`xl\n${err}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
            });
    }
};






function rndID() {
    return ((Date.now() - 1420070400000) * 4194304).toFixed();
}

function btoa(str) {
    return new Buffer(str).toString('base64');
}

function rtoken(amnt) {
    const final = [];
    let current = '';
    const amount = amnt || 1;
    const a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const b = ['_', '-'];
    for (let j = 0; j < amount; j++) {
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
        final.push(current);
        current = '';
    }
    return final;
}