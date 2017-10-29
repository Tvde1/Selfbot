const distance = require("jaro-winkler");
const has = (o, p) => Object.prototype.hasOwnProperty.call(o, p);

function dist(target, list) {
    let highest = 0,best;
    for (const key of list) {
        const dist = distance(target, key);
        if (dist > highest) {
            best = key;
            highest = dist;
        }
    }
    return best;
}

function find(target, prop, value, setting) {
    prop = has(target, prop) ? prop : dist(prop, getKeys(target));
    if (setting) return target[prop] = value;
    return target[prop];
}

function getKeys(obj) {
    if (obj === null) return [];
    const keys = Object.getOwnPropertyNames(obj);
    const proto = Reflect.getPrototypeOf(obj);
    return keys.concat(getKeys(proto));
}

const handler = {
    get(target, prop) {
        const found = find(target, prop);
        return typeof found === 'object' ? new Proxy(found, handler) : found;
    },
    set(target, prop, value) {
        const found = find(target, prop, value, true);
        return typeof found === 'object' ? new Proxy(found, handler) : found;
    },
};

function autocorrect(obj) {
    return new Proxy(obj, handler);
}

if (typeof module !== 'undefined') module.exports = autocorrect;
if (typeof window !== 'undefined') window.objAutocorrect = autocorrect;