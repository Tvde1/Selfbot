module.exports = (client) => {

    client.tools.fetchFromAPI = async (endpoint, options) => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const requestOptions = {
            agent,
            headers: {
                'Authorization': `Bearer ${client.config.fbotApiKey}`
            }
        };
        
        if (options) {
            requestOptions.method = 'POST';
            requestOptions.headers['Content-Type'] = 'application/json';

            requestOptions.body = JSON.stringify({
                images: options.images,
                args: options.args
            });
        }

        const result = await this.bot.fetch(`https://185.162.249.160:3000/${endpoint}`, requestOptions);

        if (!result.ok) {
            const body = await result.json();

            let error = new Error('Could not fetch result from API');
            if (body && body.meta && body.meta.error) error = new Error(body.meta.error.message);

            return Promise.reject(error);
        } else {
            const buffer = await result.buffer();
            return buffer;
        }
    };
};