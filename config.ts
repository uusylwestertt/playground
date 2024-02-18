import * as dotenv from 'dotenv-safe';

dotenv.config({
  example: './.env',
  allowEmptyValues: true,
}).required;

export const config = {
  baseUrl: `http://hoolsgame.com/`,
  numberOfHools: process.env.NUMBER_OF_HOOLS as string,
  loginBorsuk: process.env.LOGIN_BORSUK as string,
  loginLyysyy: process.env.LOGIN_LYYSYY as string,
  loginVegeta: process.env.LOGIN_VEGETA as string,
  passwordLyysyyVegeta: process.env.PASSWORD as string,
  passwordBorsuk: process.env.PASSWORD_BORSUK as string,
};
