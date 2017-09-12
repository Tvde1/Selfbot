exports.run = (client, message, args) => {
    message.edit(args.join(' ').replace(/[pbvfg]/gi, '🅱'));
};

exports.help = {
    name: 'b',
    description: 'Replaces all p/b/v/f/g with :b:.',
    usage: 'b [text]'
};