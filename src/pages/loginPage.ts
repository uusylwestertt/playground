import BasePage from './basePage';
import { config } from '../../config';
import { Users } from '../enums/users';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      loginLink: `a[href="login.php"]`,
      userInput: `input[name="log[nick]"]`,
      passwordInput: `input[name="log[password]"]`,
      loginButton: `input[type="image"]`,
    };
  }

  async login() {
    const login = config.user;
    const password = login == Users.lysy ? config.passwordLyysyy : config.passwordBorsuk;
    await this.click(this.elements.loginLink);
    await this.typeIn(this.elements.userInput, login);
    await this.typeIn(this.elements.passwordInput, password);
    await this.click(this.elements.loginButton);
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
