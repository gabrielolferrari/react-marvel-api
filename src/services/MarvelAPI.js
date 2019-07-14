import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { configAPIMarvel as config } from '../config';

const request = axios.create({
  baseURL: `${config.baseUrl}`,
  responseType: 'json',
});

const timeStamp = moment().unix();

const generateHash = () => {
  const hash = CryptoJS.MD5(timeStamp + config.privateKey + config.publicKey)
    .toString(CryptoJS.enc.Hex);

  return hash;
};

export const getCharacters = async (character) => {
  const URI = '/characters';
  let params = `?apikey=${config.publicKey}&ts=${timeStamp}&hash=${generateHash()}`;

  if (character) {
    params = params.concat(`&name=${character}`);
  }

  const url = `${URI}${params}`;

  return request.get(url);
};

export const getComics = async (page, character) => {
  const count = 21;
  const currentPage = page || 1;
  const currentOffset = currentPage === 1 ? 0 : (count * (page - 1));

  const URI = '/comics';
  let params = `?limit=${count}&offset=${currentOffset}&apikey=${config.publicKey}&ts=${timeStamp}&hash=${generateHash()}`;

  if (character) {
    await getCharacters(character).then((result) => {
      const idChar = result.data.data.results[0].id;
      params = params.concat(`&characters=${idChar}`);
    });
  }

  const url = `${URI}${params}`;

  return request.get(url);
};
