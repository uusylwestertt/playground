import BasePage from './basePage';
import { clickHoolAvatar, closeHoolAvatar, countAllHools, getHoolCash, hoolNumberOfCurrentTasks, openTeam, setWork } from './components';
import { log } from '../helpers/logger';
import { Page } from '@playwright/test';

export class HeadTraining extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  beerIconLocator = `img[src="http://www.hoolsgame.com/img/game/img_bar/piwo.jpg"]`;

  async runTraining() {
    const numberOfHolls = await countAllHools(this.page);
    for (let hoolNumber = 1; hoolNumber < numberOfHolls; hoolNumber++) {
      await this.setHeadTraining(hoolNumber);
    }
  }

  async setHeadTraining(hoolNumber: number) {
    log.info(`Set head training on hool nr: ${hoolNumber}`);
    await openTeam(this.page);
    await clickHoolAvatar(hoolNumber, this.page);

    const numberOfCurrentTasks = await hoolNumberOfCurrentTasks(hoolNumber, this.page);
    const cashOnHool = await getHoolCash(hoolNumber, this.page);

    await this.clickHoolHeadBar(hoolNumber);
    await closeHoolAvatar(hoolNumber, this.page);

    const priceBeer = await this.getPriceBeear(hoolNumber);

    if (priceBeer == null) {
      await this.closeHeadBar(hoolNumber);
    } else {
      const numberOfPotentialTasks = await this.countNummberOfAvailableBeerTasks(cashOnHool, priceBeer);

      const numberOfPossibleTasks = numberOfPotentialTasks - numberOfCurrentTasks;
      if (numberOfPossibleTasks > 0) {
        await this.clickOnBeerIcon(hoolNumber, numberOfPossibleTasks, numberOfCurrentTasks);
      } else {
        const numberOfWorkHours = 20 - numberOfCurrentTasks;
        log.info(`No money on hool set work : ${numberOfWorkHours} hours`);
        await setWork(hoolNumber, numberOfWorkHours, this.page);
        await this.closeHeadBar(hoolNumber);
      }
    }
  }

  async countNummberOfAvailableBeerTasks(money: number, priceBeer: number) {
    return Math.floor(money / priceBeer);
  }

  async clickOnBeerIcon(hoolNumber: number, numberOfPossibleTasks: number, numberOfCurrentTasks: number) {
    for (let i = numberOfCurrentTasks + 1; i <= 20; i++) {
      try {
        await this.gameClick(this.beerIconLocator);
      } catch {
        await this.closeHeadBar(hoolNumber);
      }

      if (numberOfPossibleTasks == 0) {
        await this.closeHeadBar(hoolNumber);
        break;
      }

      if (i == 20) {
        log.info(`Max number of task reached closing beer bar`);
        await this.closeHeadBar(hoolNumber);
      }
      numberOfPossibleTasks--;
    }
  }

  async closeHeadBar(hoolNumber: number) {
    const closeHeadBarIcon = `#bar${hoolNumber} img[src="img/3.jpg"]`;
    await this.gameClick(closeHeadBarIcon);
  }

  async getPriceBeear(hoolNumber: number) {
    const priceLocator = `(//*[@id='bar${hoolNumber}-inner']//td//tbody//tr//td//b)[3]`;
    if (await this.isVisibleElement(priceLocator)) {
      const priceTemp = await this.storeText(priceLocator);
      const price = priceTemp.split(' ')[0];
      return Number(price);
    } else {
      return null;
    }
  }

  async clickHoolHeadBar(hoolNumber: number) {
    const hoolHeadBarLocator = `#hool${hoolNumber}-inner table:nth-child(3) tr:nth-child(2) td:nth-child(4) a`;
    if (await this.isVisibleElement(hoolHeadBarLocator)) {
      await this.gameClick(hoolHeadBarLocator);
    } else {
      await clickHoolAvatar(hoolNumber, this.page);
      await this.gameClick(hoolHeadBarLocator);
    }
  }
}
