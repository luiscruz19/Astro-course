const IGNORE_IN_URL = ['validation'];

const MESSAGE_ERROR = {
    estado: 0,
    message: 'No se pudo realizar la peticion'
};


/**
 * Enviar peticion al servidor por fecth
 */
export default async function connection({ method = 'POST', url = '', extraHeaders = {}, params = {} }) {
    let headers = new Headers({
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
    });

    /*AGREGRO LOS HEADERS EXTRAS ENVIADOS*/

    if (Object.keys(extraHeaders).length !== 0) {
        for (let headers_key in extraHeaders) {
            headers.append(headers_key, extraHeaders[headers_key]);
        }
    }

    let options = {
        method: method,
        headers: headers,
        redirect: 'follow',
    };

    const comparation_method = method === 'GET' || method === 'DELETE';
    options = !comparation_method ? { ...options, body: params } : options;

    let init = 0;
    /*AGREGRO A LA URL LOS PARAMETROS ENVIADOS*/
    if (comparation_method) {
        if (Object.keys(params).length !== 0) {
            for (let key in params) {
                if (!IGNORE_IN_URL.includes(key)) {
                    url = init === 0 ? `${url}?${key}=${params[key]}` : `${url}&${key}=${params[key]}`;
                    init++;
                }
            }
        }
    }
    let response;
    try {
        response = await fetch(url, options);
        if (!response.ok) {
            let message = response.description ?? response.statusText;
            response = MESSAGE_ERROR;
            response.message = message;
        } else {
            response = await response.json();
        }

    } catch (error) {
        response = MESSAGE_ERROR;
        response.message = error;
    } finally {
        return response;
    }
}