exports.run = (client, message, args) => {
    if (args.length === 0) args = ['how', 'to', 'add', 'arguments'];
    message.edit('http://lmgtfy.com/?q=' + args.join('+'));
};

exports.help = {
    name: 'lmgtfy',
    description: 'For stupid questions.',
    usage: 'lmgtfy [args]'
};