const ExtendedClient = require('./extendedClient');
const client         = new ExtendedClient({
    messageSweepInterval: 0,
    disabledEvents: [
        // 'READY',
        // 'RESUMED',
        // 'GUILD_SYNC',
        'GUILD_CREATE',
        'GUILD_DELETE',
        'GUILD_UPDATE',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        'GUILD_MEMBER_UPDATE',
        // 'GUILD_MEMBERS_CHUNK',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_DELETE',
        'GUILD_ROLE_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'CHANNEL_CREATE',
        'CHANNEL_DELETE',
        'CHANNEL_UPDATE',
        'CHANNEL_PINS_UPDATE',
        // 'MESSAGE_CREATE',
        // 'MESSAGE_DELETE',
        // 'MESSAGE_UPDATE',
        'MESSAGE_DELETE_BULK',
        // 'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        'USER_UPDATE',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'PRESENCE_UPDATE',
        'VOICE_STATE_UPDATE',
        'TYPING_START',
        'VOICE_SERVER_UPDATE',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE'
    ]
});

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));

client.login(client.config.token).catch(err => client.logger.error('Login', err.message));