exports.run = (client) => {
	client.log('console', 'Bot is ready.');
	delete client.user.email;
};