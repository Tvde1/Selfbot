const fs = require('fs');

class Settings {

    constructor(logger) {
        this.logger = logger;
        this._settings = {};
        this.loadSettings();
    }

    loadSettings() {
        fs.readFile('./settings.json', (err, data) => {
            if (err) {
                this.logger.log('Settings', 'Could not find settings file so generated a new one.');

                this._createNewSettings();
            } else {
                this._settings = JSON.parse(data);
            }
        });
    }

    _createNewSettings() {
        const settings = ['logmessages', 'logmentions'];
        
        for (const s of settings) {
            this._settings[s] = false;
            this._settings[`${s}_guild`] = [];
        }
                        
        this.saveSettings();
    }

    saveSettings() {
        fs.writeFile('./settings.json', JSON.stringify(this._settings), (error) => {
            if (error) this.logger.error('Settings', 'An error occured while saving.');
        });
    }

    get settings() {
        return this._settings;
    }

    serialize() {
        return JSON.stringify(this._settings);
    }
}

module.exports = Settings;