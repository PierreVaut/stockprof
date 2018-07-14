import Cookies from 'universal-cookie';
import { domain } from '../config/domain';

const params = { path: '/', httpOnly: false, withCredentials: true };

// provides a cookieID and a visitLast to each user
export const cookie = {

  handle(req, res, data, cb) {
    const cookies = new Cookies(req.headers.cookie);

    // Cookie already exists.
    if (cookies.get(domain) && (cookies.get(domain) !== '')) {
      data.cookie = cookies.get(domain);
      data.error = false;
      console.log('[Cookie-handler] New visit:', data.cookie);
      console.log('[Cookie-handler] CB:', data);
      cb(data);
    } else if (!cookies.get(domain) || cookies.get(domain) === '') {
      const rdm = Math.floor(Math.random() * 99999942);
      cookies.set(domain, rdm, params);

      if (cookie) {
        // Cookie creation.
        data.cookie = cookies.get(domain);
        data.error = false;
        console.log('[Cookie-handler] Cookie created:', data.cookie);
        console.log('[Cookie-handler] CB:', data);
        cb(data);
      } else {
        // Error on cookie creation.
        data.cookie = `[Cookie-handler] Error on cookie creation:${cookie}, ${domain}, ${rdm}`;
        data.error = data.account;
        console.error(data.cookie);
        res.json(data);
      }
    }
  },

  remove(req, res, data, cb) {
    const cookies = new Cookies(req.headers.cookie);
    data.cookie = cookies.get(domain);
    data.error = false;
    cookies.remove(domain); // No error handling :(
    cb(data);
  },
};
