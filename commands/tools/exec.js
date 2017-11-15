const exec = require('child_process').exec;
const CommandInfo = require('../../templates/commandInfo');
const Command     = require('../../templates/command');

module.exports = class extends Command {

    constructor(client) {
        super(client, new CommandInfo('exec', 'Executes a console command.', 'exec [command]'));
    }

    async run(message, args) {
        if (args.length === 0) throw new Error('You need to input something...');
        let command = args.join(' ');

        exec(command, (err, result) => {
            message.edit(`${message.content}\n==========\n\`\`\`\n${err || result}\n\`\`\``);
        });
    }
};
