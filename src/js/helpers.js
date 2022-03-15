import { TIMEOUT_SEC } from './config';
/**
 * faking and rejected promise (useful for timeout)
 * @param  {Number} seconds Seconds required to reject
 * @returns {Promise} rejected promise
 */
export const timeout = function (sec) {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej(new Error('Connection time out !'));
    }, sec * 1000);
  });
};
/**
 * get json data from api
 * @param  {URL} url
 * @returns {JSON} received json from api
 */
export const getJSON = async function (url) {
  try {
    const data = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const result = await data.json();

    return result;
  } catch (error) {
    throw error;
  }
};
