import BasePage from './basePage';
import { sleep } from './components';
import { log } from '../helpers/logger';
import { Page } from '@playwright/test';

export class Fights extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {};
  }

  async wait() {
    log.info('Wait 10 min');
    await sleep(605000);
  }

  private fightButtonCenterColumn(positionNr: number) {
    return `#ustawki-inner td[align='center']:nth-child(2) tr:nth-child(${positionNr}) td:nth-child(4) `;
  }

  private fightButtonLeftColumn(positionNr: number) {
    return `#ustawki-inner td[align='center']:nth-child(1) tr:nth-child(${positionNr}) td:nth-child(4)`;
  }

  private fightButtonLocatorCenter(postionNumber: number) {
    return `${this.fightButtonCenterColumn(postionNumber)} a:nth-child(2)`;
  }

  async executeFightsVegeta() {
    log.info('Executing fights for vegeta');
    for (let i = 0; i < 8; i++) {
      log.info('Run number' + i);
      for (let i = 7; i < 15; i++) {
        if (await this.isVisibleElement(this.fightButtonLocatorCenter(i))) {
          log.info(`Klikam w element w kolumnie srodek na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLocatorCenter(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable`);
        }
      }

      for (let i = 6; i < 10; i++) {
        if (this.isVisibleElement(this.fightButtonLeftColumn(i))) {
          log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLeftColumn(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable ${this.fightButtonLeftColumn(i)}`);
        }
      }
    }
  }

  async executeFightsLyysyy() {
    log.info('Executing fights for lyysyy');
    for (let i = 0; i < 8; i++) {
      log.info('Run number' + i);
      for (let i = 5; i < 14; i++) {
        if (await this.isVisibleElement(this.fightButtonLocatorCenter(i))) {
          log.info(`Klikam w element w kolumnie srodek na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLocatorCenter(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable ${this.fightButtonLocatorCenter(i)}`);
        }
      }

      for (let i = 5; i < 9; i++) {
        if (this.isVisibleElement(this.fightButtonLeftColumn(i))) {
          log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLeftColumn(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable ${this.fightButtonLocatorCenter(i)}`);
        }
      }
    }
  }

  async executeFightsBorsuk() {
    log.info('Executing fights for borsuk');
    for (let i = 0; i < 8; i++) {
      log.info('Run number' + i);
      for (let i = 3; i < 12; i++) {
        if (await this.isVisibleElement(this.fightButtonLocatorCenter(i))) {
          log.info(`Klikam w element w kolumnie srodek na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLocatorCenter(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable ${this.fightButtonLocatorCenter(i)}`);
        }
      }

      for (let i = 4; i < 7; i++) {
        if (this.isVisibleElement(this.fightButtonLeftColumn(i))) {
          log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLeftColumn(i));
          // await this.wait();
        } else {
          log.info(`Position not avilable ${this.fightButtonLeftColumn(i)}`);
        }
      }
    }
  }
}
