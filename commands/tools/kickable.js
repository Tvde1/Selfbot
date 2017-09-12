exports.run = async (client, message) => {
    if (message.channel.type !== 'text') throw new Error('You aren\'t in a guild.');
    await message.guild.fetchMembers();
    const kickMemberList = message.guild.members.filter(x => x.kickable);
    if (kickMemberList.size === 0) return client.EmbedEdit(message, 'You can kick **0** members!', 'rip');
    message.EmbedEdit(`You can kick **${kickMemberList.size}** members!`, `They are:\n${kickMemberList.map(x => x.toString()).join(', ')}.`);
};

exports.help = {
    name: 'kickable',
    description: 'Returns a list of users you can kick.',
    usage: 'kickable'
};