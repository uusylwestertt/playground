import * as dotenv from 'dotenv-safe';

dotenv.config({
  example: './.env',
}).required;

export const config = {
  baseUrl: `http://hoolsgame.com/`,
  numberOfHools: process.env.NUMBER_OF_HOOLS as string,
  user: process.env.LOGIN as string,
  passwordLyysyy: process.env.PASSWORD_LYYSYY as string,
  passwordBorsuk: process.env.PASSWORD_BORSUK as string,
};
