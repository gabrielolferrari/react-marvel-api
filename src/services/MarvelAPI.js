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
    let charInfo = [];

    await getCharacters(character).then((result) => {
      charInfo = result.data.data.results;
    });

    if (charInfo[0]) {
      params = params.concat(`&characters=${charInfo[0].id}`);
    } else {
      return null;
    }
  }

  const url = `${URI}${params}`;

  return request.get(url);
};

export const getFavoriteComics = async (id) => {
  const URI = `/comics/${id}`;
  const params = `?apikey=${config.publicKey}&ts=${timeStamp}&hash=${generateHash()}`;

  const url = `${URI}${params}`;

  return request.get(url);
};
