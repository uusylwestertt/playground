import * as dotenv from 'dotenv-safe';

dotenv.config({
  example: './.env',
  allowEmptyValues: true,
}).required;

export const config = {
  baseUrl: `http://hoolsgame.com/`,
  numberOfHools: process.env.NUMBER_OF_HOOLS as string,
  login: process.env.LOGIN as string,
  passwordLyysyyVegeta: process.env.PASSWORD as string,
  passwordBorsuk: process.env.PASSWORD_BORSUK as string,
};
