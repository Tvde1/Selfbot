class CommandInfo {
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {string} usage 
     */
    constructor(name, description, usage) {
        if (!name || typeof name !== 'string' || !description || typeof name !== 'string' || !usage || typeof usage !== 'string') {
            throw new Error('Invalid parameters.');
        }

        this._name        = name;
        this._description = description;
        this._usage       = usage;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get usage() {
        return this._usage;
    }
}

module.exports = CommandInfo;