const fs = require('fs');

class Settings {

    constructor(logger) {
        this.logger = logger;
        this.settings = {};
        this.loadSettings();
    }

    loadSettings() {
        fs.readFile('./settings.json', (err, data) => {
            if (err) {
                this.logger.log('Settings', 'Could not find settings file so generated a new one.');

                this.createNewSettings();
            } else {
                this.settings = JSON.parse(data);
            }
        });
    }

    createNewSettings() {
        const settings = ['logmessages', 'logmentions'];
        
        for (const s of settings) {
            this.settings[s] = false;
            this.settings[`${s}_guild`] = [];
        }
                        
        this.saveSettings();
    }

    saveSettings() {
        fs.writeFile('./settings.json', JSON.stringify(this.settings), (error) => {
            if (error) this.logger.error('Settings', 'An error occured while saving.');
        });
    }

    get getSettings() {
        return this.settings;
    }

}

module.exports = Settings;