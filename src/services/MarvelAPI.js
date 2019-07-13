import axios from 'axios';
import CryptoJS from 'crypto-js'
import moment from 'moment'
import {configAPIMarvel as config } from '../config';

const request = axios.create({
  baseURL: `${config.baseUrl}`,
  responseType: "json"
});

const timeStamp = moment().unix();

const generateHash = () => {
  const hash = CryptoJS.MD5(timeStamp + config.privateKey + config.publicKey)
    .toString(CryptoJS.enc.Hex)

  return hash;
}

export const getCharacters = () => {
  const URI = '/characters';
  const params = `?apikey=${config.publicKey}&ts=${timeStamp}&hash=${generateHash()}`;
  const url = `${URI}${params}`;

  return request.get(url);
}

export const getComics = () => {
  const URI = '/comics';
  const params = `?limit=21&apikey=${config.publicKey}&ts=${timeStamp}&hash=${generateHash()}`;
  const url = `${URI}${params}`;

  return request.get(url);
}