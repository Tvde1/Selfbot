const ObjectAutocorrect = require('object-autocorrect'         );
const CommandInfo       = require('../../templates/commandInfo');
const mongoose          = require('mongoose'                   ); //eslint-disable-line no-unused-vars
const Command           = require('../../templates/command'    );
const discord           = require('discord.js'                 ); //eslint-disable-line no-unused-vars
const util              = require('util'                       );

class EvalCommand extends Command {
    constructor(client) {
        super(client, new CommandInfo('eval', 'Evaluates arbitrary javascript.', 'eval [...code]'));
    }

    async run(_message, args) {
        if (args.length < 1) throw new Error('Eval something lol');
        let match = args.join(' ');

        if (args[0] === 'async') {
            args.shift();
            match = `(async()=>{${args.join(' ')}})()`;
        }

        const message = new ObjectAutocorrect(_message   ); //eslint-disable-line no-unused-vars
        const client  = new ObjectAutocorrect(this.client); //eslint-disable-line no-unused-vars

        let evaled, diff, start;
        try {
            evaled = eval(match);
            diff = process.hrtime(start);
        } catch (error) {
            diff = process.hrtime(start);
            const response = error.message;
            _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:warning: Error:**\n\`\`\`xl\n${response}\n\`\`\`\n**Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
            return;
        }

        if (evaled && typeof evaled.getTarget === 'function') {
            evaled = evaled.getTarget();
        }

        let isPromise = false;
        if (evaled && typeof evaled.then === 'function') {
            isPromise = true;

            try {
                evaled = await evaled;
            } catch (err) {
                _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: Promise Error:**\n\`\`\`xl\n${err}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
                return;                
            }
        }
    
        const type = typeof(evaled);
        let response = evaled;
        if (type === 'object') {
            try {
                response = util.inspect(evaled, {depth: 1});
            }
            catch (err) {
                console.log(`Error while stringifying: ${err.message}`);
            }
        }

        if (response && response.toString().includes(this.client.token)) {
            response = response.replace(this.client.token, rtoken(1)[0]);
        }

        await _message.edit(`**Eval:**\n**:speech_balloon: Input:**\n\`\`\`js\n${match}\n\`\`\`\n**:white_check_mark: ${isPromise ? 'Promise ' : ''}Output:**\n\`\`\`js\n${response}\n\`\`\`\n**Type:** \`${type}\` | **Time Taken:** \`${diff[0] * 1e9 + diff[1]}\` nanoseconds.`);
    }
}

module.exports = EvalCommand;