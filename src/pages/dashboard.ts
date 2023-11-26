import { Page } from "@playwright/test";
import BasePage from "./basePage";

export class Dashboard extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      teamLink: `(//a[contains(text(),'Team')])[1]`,
      closeNewsButton: `#news a[href="#"]`,
    };
  }

  async clickTeamButton() {
    await this.click(this.elements.closeNewsButton);
    await this.gameClick(this.elements.teamLink);
  }
}
