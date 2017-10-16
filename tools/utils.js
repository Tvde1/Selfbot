const fetch = require('node-fetch');
const jimp  = require('jimp');

class Utils {

    constructor(config) {
        this.config = config;
    }

    /**
     * Returns a nicer output than 'true' or 'false'.
     * @param {boolean} cond 
     */
    niceBool(cond) {
        return cond ? 'Yes.' : 'No.';
    }

    /**
     * Replaces all occurences of 'whatText' with 'withText'.
     * @param {string} text The text. 
     * @param {string} whatText What to replace.
     * @param {string} withText What to replace with.
     */
    replaceAll(text, whatText, withText) {
        text = text.replace(whatText, withText);
        return text.includes(whatText) ? this.ReplaceAll(text, whatText, withText) : text;
    }

    /**
     * Escapes special regex characters.
     * @param {string} str 
     */
    escapeStringRegExp(str) {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }

    /**
     * Capitalises the first letter of the string.
     * @param {string} text 
     */
    capitaliseFirstLetter(text) {
        const textArray = (text).split('');
        return textArray.shift().toUpperCase() + textArray.join('');
    }

    /**
     * If needed, adds a dot to the end of the sentence.
     * @param {string} text 
     */
    addDot(text) {
        return '!.?~'.includes(text[text.length - 1]) ? text : `${text}.`;
    }

    /**
     * Returns true if a string is/has a url.
     * @param {string} value 
     */
    isURL(value) {
        return /^(https?:\/\/)?.+(\..+)?\.\w+(\/[^/]*)*$/.test(value);
    }

    /**
     * Returns an object with data about faces in an image.
     * @param {buffer} image 
     */
    async detectFaces(image) {
        let buff;

        try{ 
            buff = await this.getBufferFromJimp(image);
        }
        catch (err) {
            throw new Error('Failed to get buffer from image.');
        }

        try {
            for (const token of this.config.oxfordTokens) {
                const facesRequest = await fetch('https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=headPose', {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': token,
                        'Content-Type': 'application/octet-stream'
                    },
                    body: buff
                });

                if (!facesRequest.ok) continue;

                const faces = await facesRequest.json();
                if (!faces.length) return new Error('No faces detected');
                return faces;
            }
        }
        catch(err) {
            return new Error('There was an unexpected API error');
        }
    }

    /**
     * Gets a buffer from a jimp image.
     * @param {*} img 
     * @param {string} mime 
     * @returns {buffer}
     */
    getBufferFromJimp(img, mime) {
        return new Promise(async (resolve, reject) => {

            if (img.bitmap.width > 1024 || img.bitmap.height > 1024) img = await img.scaleToFit(1024, 1024);

            img.getBuffer(mime || jimp.MIME_PNG, (err, buffer) => {
                if (err) reject(err);
                resolve(buffer);
            });
        });
    }
}

module.exports = Utils;