const exec = require("child_process").exec;

exports.run = async (client, message, args) => {
    if (args.length === 0) throw new Error('You need to input something...');
    let command = args.join(' ');

    exec(command, (err, result) => {
        message.edit(`${message.content}\n==========\n\`\`\`\n${err || result}\n\`\`\``);
    });
};

exports.help = {
    name: 'exec',
    description: 'Executes a console command.',
    usage: 'exec [command]'
};