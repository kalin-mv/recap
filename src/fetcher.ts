import { HTTP_METHOD, IMessageBlock, MessageType } from './constants';
import { isEmpty } from './utils';

const fetcher = (...args) => {
  console.log('fetch', args);
  return fetch(...args).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null; // 204 does not have body
      payload = await res.json();
    } catch (e) {
      /* noop */
    }
    if (res.ok) {
      return payload;
    } else {
     return Promise.reject(payload.error || new Error('Something went wrong'));
    }
});
};

export default fetcher;




const xFetch = (endpoint: string,  method: HTTP_METHOD, data = {}) => {
    let fullUrl = '/api' + endpoint;

    const params: any = {
        method,
        credentials: 'include',
        headers: {
            // Authorization: 'bearer ' + token, // get token from cookies
        },
    };

    if (method !== HTTP_METHOD.GET) {
        params['headers']['content-type'] = 'application/json';
        params['body'] = JSON.stringify(data);

    } else {
        const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        fullUrl += (opts.length > 0?'?' + opts:'');
    }

    return fetch(fullUrl, params)
        .then((response) => {
            return response.json().then((json) => ({ json, response }));
        })
        .then(({ json, response }) =>
            Promise.resolve({
                success: response.ok ? true : false,
                response: json
            })
        );
};


const actionRequest = async (uri: string, method: HTTP_METHOD, data?: any) => {
    let success = true;
    let message = {} as IMessageBlock;
    const result = await xFetch(uri, method, data);
    success = result.success;
    if (result.response.message && !isEmpty(result.response.message)) {
        const msgType =  success ? MessageType.INFO : MessageType.ERROR;
        message = { text: result.response.message, code: result.response.code, msgType };
        // sendMessage(message);
    }
    const response = result.response.data;
    return { response, message };
};



export const xSave = (uri: string, data: any = {}) => {
    return actionRequest(uri, HTTP_METHOD.POST, data);
};

export const xRead = (uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) => {
    return actionRequest(uri, method, data);
};

export const xDelete = (uri: string, data: any = {}) => {
    return actionRequest(uri, HTTP_METHOD.DELETE, data);
};