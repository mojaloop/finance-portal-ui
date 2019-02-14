
// TODO: prevent any plaintext requests in production

const util = require('util');

const defaultEndpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:3002' : window.location.origin;

const respErrSym = Symbol('ResponseErrorDataSym');

class HTTPResponseError extends Error {
    constructor(params) {
        super(params.msg);
        this[respErrSym] = params;
    }

    getData() {
        return this[respErrSym];
    }

    toString() {
        return util.inspect(this[respErrSym]);
    }

    toJSON() {
        return JSON.stringify(this[respErrSym]);
    }
}


// Strip all beginning and end forward-slashes from each of the arguments, then join all the
// stripped strings with a forward-slash between them. If the last string ended with a
// forward-slash, append that to the result.
const buildUrl = (...args) => args
    .filter(e => e !== undefined)
    .map(s => s.replace(/(^\/*|\/*$)/g, '')) /* This comment works around a problem with editor syntax highglighting */
    .join('/')
    + ((args[args.length - 1].slice(-1) === '/') ? '/' : '');

const throwOrJson = async (res, msg = 'HTTP request returned error response code') => {
    const resp = await res.json();
    if (res.ok) {
        return resp;
    }
    throw new HTTPResponseError({ msg, res, resp });
};


async function get(path, { endpoint = defaultEndpoint, logger = () => {} } = {}) {
    try {
        const opts = {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting GET. URL:', path, 'Error:', e));
        throw e;
    }
}


async function put(path, body, { endpoint = defaultEndpoint, logger = () => {} } = {}) {
    try {
        const opts = {
            method: 'PUT',
            headers: { 'content-type': 'application/json', 'accept': 'application/json' },
            body: JSON.stringify(body)
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting PUT. URL:', path, 'Body:', body, 'Error:', e));
        throw e;
    }
}


async function post(path, body, { endpoint = defaultEndpoint, logger = () => {} } = {}) {
    try {
        const opts = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json' },
            body: JSON.stringify(body)
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting POST. URL:', path, 'Body:', body, 'Error:', e));
        throw e;
    }
}

export {
    get,
    put,
    post
};
