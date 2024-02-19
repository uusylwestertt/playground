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
    return `${this.fightButtonCenterColumn(postionNumber)} a:nth-child(2)`;
  }

  private fightButtonLeft(postionNumber: number) {
    return `${this.fightButtonLeftColumn(postionNumber)} a:nth-child(2)`;
  }

  async executeFights(startCenter: number, endCenter: number, startLef: number, endLeft: number) {
    await sleep(500);
    if (await this.isVisibleElement(this.elements.clock)) {
      log.info('Clock displayed breaking...');
    } else {
      for (let i = startCenter; i <= endCenter; i++) {
        log.info(`Sprawdzam element:  ${this.fightButtonCenter(i)}`);
        if (await this.isVisibleElement(this.fightButtonCenter(i))) {
          log.info(`Klikam w element w kolumnie center na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonCenter(i));
          break;
        } else {
          log.info(`Position ${i} not avilable`);
        }
      }
    }

    if (await this.isVisibleElement(this.elements.clock)) {
      log.info('Clock displayed breaking...');
    } else {
      for (let i = startLef; i <= endLeft; i++) {
        log.info(`Sprawdzam element:  ${this.fightButtonLeft(i)}`);
        if (await this.isVisibleElement(this.fightButtonLeft(i))) {
          log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
          await this.gameClick(this.fightButtonLeft(i));
          break;
        } else {
          log.info(`Position not avilable ${this.fightButtonLeftColumn(i)}`);
        }
      }
    }
  }

  // async executeFightsLyysyy() {
  //   log.info('Executing fights for lyysyy');
  //   for (let i = 0; i < 8; i++) {
  //     log.info('Run number' + i);
  //     for (let i = 5; i < 14; i++) {
  //       if (await this.isVisibleElement(this.fightButtonCenter(i))) {
  //         if (this.isVisibleElement(this.elements.clock)) {
  //           break;
  //         } else {
  //           log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
  //           await this.gameClick(this.fightButtonCenter(i));
  //           await this.wait();
  //         }
  //       } else {
  //         log.info(`Position not avilable ${this.fightButtonCenter(i)}`);
  //       }
  //     }

  //     for (let i = 5; i < 9; i++) {
  //       if (this.isVisibleElement(this.fightButtonLeft(i))) {
  //         if (this.isVisibleElement(this.elements.clock)) {
  //           break;
  //         } else {
  //           log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
  //           await this.gameClick(this.fightButtonLeft(i));
  //           await this.wait();
  //         }
  //       } else {
  //         log.info(`Position not avilable ${this.fightButtonLeft(i)}`);
  //       }
  //     }
  //   }
  // }

  // async executeFightsBorsuk() {
  //   log.info('Executing fights for borsuk');
  //   for (let i = 0; i < 8; i++) {
  //     log.info('Run number' + i);
  //     for (let i = 3; i < 12; i++) {
  //       if (await this.isVisibleElement(this.fightButtonCenter(i))) {
  //         if (this.isVisibleElement(this.elements.clock)) {
  //           break;
  //         } else {
  //           log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
  //           await this.gameClick(this.fightButtonCenter(i));
  //           await this.wait();
  //         }
  //       } else {
  //         log.info(`Position not avilable ${this.fightButtonCenter(i)}`);
  //       }
  //     }

  //     for (let i = 4; i < 7; i++) {
  //       if (this.isVisibleElement(this.fightButtonLeft(i))) {
  //         if (this.isVisibleElement(this.elements.clock)) {
  //           break;
  //         } else {
  //           log.info(`Klikam w element w kolumnie left na pozycji:  ${i}`);
  //           await this.gameClick(this.fightButtonLeft(i));
  //           await this.wait();
  //         }
  //       } else {
  //         log.info(`Position not avilable ${this.fightButtonLeft(i)}`);
  //       }
  //     }
  //   }
  // }
}
