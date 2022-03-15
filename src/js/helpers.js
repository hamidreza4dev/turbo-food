import { TIMEOUT_SEC } from './config';

export const timeout = function (sec) {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej(new Error('Connection time out !'));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const data = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const result = await data.json();

    return result;
  } catch (error) {
    throw error;
  }
};
