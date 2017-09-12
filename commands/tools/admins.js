exports.run = async (client, message) => {
    const newGuild = await message.guild.fetchMembers();

    const admins = newGuild.members.filter(x => x.hasPermission('ADMINISTRATOR'));
    message.EmbedEdit('All admins:', admins.map(x => x.toString()).join(', ') + '.');
};

exports.help = {
    name: 'admins',
    description: 'Gets a list of all administrators.',
    usage: 'admins'
};