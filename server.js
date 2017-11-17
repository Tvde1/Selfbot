const ExtendedClient = require('./extendedClient');

new ExtendedClient({
    messageSweepInterval: 0,
    disabledEvents: [
        'CHANNEL_CREATE',
        'CHANNEL_DELETE',
        'CHANNEL_PINS_UPDATE',
        'CHANNEL_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'GUILD_CREATE',
        'GUILD_DELETE',
        // 'GUILD_MEMBERS_CHUNK',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        'GUILD_MEMBER_UPDATE',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_DELETE',
        'GUILD_ROLE_UPDATE',
        // 'GUILD_SYNC',
        'GUILD_UPDATE',
        // 'MESSAGE_CREATE',
        // 'MESSAGE_DELETE',
        'MESSAGE_DELETE_BULK',
        // 'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        // 'MESSAGE_UPDATE',
        'PRESENCE_UPDATE',
        // 'READY',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE',
        // 'RESUMED',
        'TYPING_START',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'USER_UPDATE',
        'VOICE_SERVER_UPDATE',
        'VOICE_STATE_UPDATE'
    ]
});

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err && err.stack || err}`));