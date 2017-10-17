const exec = require('child_process').exec;
const Command = require('../../command');

class ExecCommand extends Command {

    constructor() {
        super();
 
        this.help = {
            name: 'exec',
            description: 'Executes a console command.',
            usage: 'exec [command]'
        };
    }

    async run (client, message, args) {
        if (args.length === 0) throw new Error('You need to input something...');
        let command = args.join(' ');

        exec(command, (err, result) => {
            message.edit(`${message.content}\n==========\n\`\`\`\n${err || result}\n\`\`\``);
        });
    }
}

module.exports = ExecCommand;