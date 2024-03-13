import { log } from '../helpers/logger';
import BasePage from './basePage';
import { Page } from '@playwright/test';

export class Dashboard extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      teamLink: `(//a[contains(text(),'Team')])[1]`,
      closeNewsButton: `#news a[href="#"]`,
      fightsLink: `//a[contains(text(),'Play Off')]`,
      closeFightsWindow: `#ustawki img[src="img/3.jpg"]`,
      logoutButton: `a[href="?menu=logout"]`,
    };
  }

  async clickTeamButton() {
    if (await this.isVisibleElement(this.elements.closeNewsButton)) {
      await this.click(this.elements.closeNewsButton);
    }
    await this.gameClick(this.elements.teamLink);
  }

  async clickFights() {
    if (await this.isVisibleElement(this.elements.closeNewsButton)) {
      log.info('News popup displayed closing it');
      await this.click(this.elements.closeNewsButton);
    }
    await this.gameClick(this.elements.fightsLink);
  }

  async logout() {
    await this.click(this.elements.closeFightsWindow);
    await this.gameClick(this.elements.logoutButton);
  }
}
