
// TODO: prevent any plaintext requests in production

const util = require('util');

const credentials = (process.env.NODE_ENV === 'development') ? 'include' : 'same-origin'; // 'same-origin', include', 'omit'

const defaultEndpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:3002' : new URL('admin-portal-backend', window.location.origin).href;

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


// This will only work if the server returns a content-disposition header value of 'attachment'
function triggerDownload(path, { endpoint = defaultEndpoint } = {}) {
    window.location = buildUrl(endpoint, path);
}

function fetchTimeoutController({ timeoutMs = 5000, controller = new AbortController() } = {}) {
    let reason = 'timeout';
    return {
        timeout: setTimeout(() => controller.abort(), timeoutMs),
        controller,
        abortFn: (() => {
            reason= 'user';
            controller.abort();
        }),
        ignoreAbort: (abortReason = 'user') => err => {
            if (err.name !== 'AbortError' || abortReason !== reason) {
                throw err;
            }
        }
    };
}


async function get(path, { endpoint = defaultEndpoint, logger = () => {}, ftc = fetchTimeoutController() } = {}) {
    try {
        const opts = {
            method: 'GET',
            headers: { 'accept': 'application/json' },
            credentials,
            signal: ftc.controller.signal
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting GET. URL:', path, 'Error:', e));
        throw e;
    }
}


async function put(path, body, { endpoint = defaultEndpoint, logger = () => {}, ftc = fetchTimeoutController() } = {}) {
    try {
        const opts = {
            method: 'PUT',
            headers: { 'content-type': 'application/json', 'accept': 'application/json' },
            body: JSON.stringify(body),
            credentials,
            signal: ftc.controller.signal
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting PUT. URL:', path, 'Body:', body, 'Error:', e));
        throw e;
    }
}


async function post(path, body, { endpoint = defaultEndpoint, logger = () => {}, ftc = fetchTimeoutController() } = {}) {
    try {
        const opts = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json' },
            body: JSON.stringify(body),
            credentials,
            signal: ftc.controller.signal
        };

        return await fetch(buildUrl(endpoint, path), opts).then(throwOrJson);
    } catch (e) {
        logger(util.format('Error attempting POST. URL:', path, 'Body:', body, 'Error:', e));
        throw e;
    }
}

function openInNewWindow(path, { endpoint = defaultEndpoint } = {}) {
    window.open(buildUrl(endpoint, path), '_blank');
}

async function downloadReport(path, { endpoint = defaultEndpoint, logger = () => {}, ftc = fetchTimeoutController() } = {}) {
    try {
        const opts = {
            method: 'GET',
            credentials,
            headers: {
                'content-type': 'octet-stream'
            }
        }

        fetch(buildUrl(endpoint, path), opts)
            .then(async res => {
                if (res.status !== 200) { throw new Error(`Status: ${res.statusText}`) }
                const content = await res.text();
                const data = new Blob([content], {type: 'text/csv'});
                const csvURL = window.URL.createObjectURL(data);
                const filename = `report_${Date.now()}.csv`;
                const tempLink = document.createElement('a');
                tempLink.href = csvURL;
                tempLink.setAttribute('download', filename);
                tempLink.click();
            })
            .catch(e => {
                logger(util.format('Error attempting download. URL:', path, 'Error:', e));
                throw e;
            });

    } catch (e) {
        logger(util.format('Error attempting POST. URL:', path, 'Error:', e));
        throw e;     
    }
}

export {
    get,
    put,
    post,
    triggerDownload,
    fetchTimeoutController,
    openInNewWindow,
    HTTPResponseError,
    downloadReport
};
