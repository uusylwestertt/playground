import BasePage from './basePage';
import { sleep } from './components';
import { log } from '../helpers/logger';
import { Page } from '@playwright/test';

export class Fights extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      clock: `#ustawki-zegar`,
    };
  }

  async wait() {
    log.info('Wait 10 min');
    await sleep(605000);
  }

  private fightButtonCenterColumn(positionNr: number) {
    return `#ustawki-inner td[align='center']:nth-child(2) tr:nth-child(${positionNr}) td:nth-child(4) `;
  }

  private fightButtonLeftColumn(positionNr: number) {
    return `#ustawki-inner td[align='center']:nth-child(1) tr:nth-child(${positionNr}) td:nth-child(4) `;
  }

  private fightButtonCenter(postionNumber: number) {
    return `//*[@id="ustawki-inner"]/table/tbody/tr/td[2]/table/tbody/tr[${postionNumber}]/td[4]/a[2]/img`;
    // return `${this.fightButtonCenterColumn(postionNumber)} a:nth-child(2)`;
  }

  private fightButtonLeft(postionNumber: number) {
    return `//*[@id="ustawki-inner"]/table/tbody/tr/td[1]/table/tbody/tr[${postionNumber}]/td[4]/a[2]/img`;
    // return `${this.fightButtonLeftColumn(postionNumber)} a:nth-child(2)`;
  }

  async executeFights(startCenter: number, endCenter: number) {
    await sleep(500);
    if (await this.isVisibleElement(this.elements.clock)) {
      log.info('Clock displayed breaking...');
    } else {
      for (let i = startCenter; i <= endCenter; i++) {
        log.info(`Sprawdzam element:  ${this.fightButtonCenter(i)}`);
        if (await this.isVisibleElement(this.fightButtonCenter(i))) {
          log.info(`Klikam w element w kolumnie center na pozycji:  ${i}`);
          log.info(`${this.fightButtonCenter(i)}`);
          await this.gameClick(this.fightButtonCenter(i));
          await sleep(200);
          break;
        } else {
          log.info(`Position ${i} not avilable`);
        }
      }
    }
  }

  pozycja7 = `//*[@id="ustawki-inner"]/table/tbody/tr/td[2]/table/tbody/tr[8]/td[4]/a[2]`;
  pozycja8 = `//*[@id="ustawki-inner"]/table/tbody/tr/td[2]/table/tbody/tr[9]/td[4]/a[2]`;
  pozycja9 = `//*[@id="ustawki-inner"]/table/tbody/tr/td[2]/table/tbody/tr[10]/td[4]/a[2]`;
  pozycja10 = `//*[@id="ustawki-inner"]/table/tbody/tr/td[2]/table/tbody/tr[11]/td[4]/a[2]`;

  async fightVegeta() {
    await sleep(500);
    if (await this.isVisibleElement(this.elements.clock)) {
      log.info('Clock displayed breaking...');
    } else if (await this.page.locator(this.pozycja7).isVisible()) {
      log.info(`Klikam w element w kolumnie center na pozycji:  7`);
      // await this.page.locator(this.pozycja7).click();
    } else if (await this.page.locator(this.pozycja8).isVisible()) {
      log.info(`Klikam w element w kolumnie center na pozycji:  8`);
      // await this.page.locator(this.pozycja8).click();
    } else if (await this.page.locator(this.pozycja9).isVisible()) {
      log.info(`Klikam w element w kolumnie center na pozycji:  9`);
      // await this.page.locator(this.pozycja9).click();
    } else if (await this.page.locator(this.pozycja10).isVisible()) {
      log.info(`Klikam w element w kolumnie center na pozycji:  10`);
      // await this.page.locator(this.pozycja10).click();
    }
  }
}
