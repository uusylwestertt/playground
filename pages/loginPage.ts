import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
        this.elements = {
          loginLink: `a[href="login.php"]`,
          userInput: `input[name="log[nick]"]`,
          passwordInput: `input[name="log[password]"]`,
          loginButton: `input[type="image"]`
        };
      }

      async login() {
        await this.click(this.elements.loginLink)
        await this.typeIn(this.elements.userInput, 'borsuk mistrz')
        await this.typeIn(this.elements.passwordInput, 'marzec23')
        await this.click(this.elements.loginButton)
      }

      async  sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
}