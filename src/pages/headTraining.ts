import BasePage from "./basePage";
import { sleep } from "../../tests/heads.spec";
import { Page } from "@playwright/test";
import { log } from "../helpers/logger";

export class HeadTraining extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  closeTeamIcon = `#ekipa img[src="img/3.jpg"]`;
  teamLink = `(//a[contains(text(),'Team')])[1]`;
  closeTeamList = `#ekipa img[src="img/3.jpg"]`;
  hoolItem = `#ekipa-inner table:nth-child(3) td img`;
  beerIconLocator = `img[src="http://www.hoolsgame.com/img/game/img_bar/piwo.jpg"]`;

  async hoolNumberOfCurrentTasks(hoolNumber: number) {
    return await this.countElementsOnPage(`#hool${hoolNumber}-inner table:nth-child(7) td`);
  }

  async getHoolCash(hoolNumber: number) {
    const cashLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(1) td:nth-child(2)`;
    const cashTmp = await this.storeText(cashLocator);
    const cash = cashTmp.split(" ")[0];
    return Number(cash);
  }

  async countAllHools() {
    await sleep(100);
    return await this.countElementsOnPage(this.hoolItem);
  }

  async runTraining() {
    const numberOfHolls = await this.countAllHools();
    for (let hoolNumber = 1; hoolNumber < numberOfHolls; hoolNumber++) {
      await this.setHeadTraining(hoolNumber);
    }
  }

  async setHeadTraining(hoolNumber: number) {
    log.info(`Set head training on hool nr: ${hoolNumber}`);
    await this.openTeam();
    await this.clickHoolAvatar(hoolNumber);

    const numberOfCurrentTasks = await this.hoolNumberOfCurrentTasks(hoolNumber);
    const cashOnHool = await this.getHoolCash(hoolNumber);

    await this.clickHoolHeadBar(hoolNumber);
    await this.closeHoolAvatar(hoolNumber);

    const priceBeer = await this.getPriceBeear(hoolNumber);

    if (priceBeer == null) {
      await this.closeHeadBar(hoolNumber);
    } else {
      const numberOfPotentialTasks = await this.countNummberOfAvailableBeerTasks(cashOnHool, priceBeer);

      const numberOfPossibleTasks = numberOfPotentialTasks - numberOfCurrentTasks;
      if (numberOfPossibleTasks > 0) {
        await this.clickOnBeerIcon(hoolNumber, numberOfPossibleTasks, numberOfCurrentTasks);
      } else {
        const numberOfWorkHours = 15 - numberOfCurrentTasks;
        log.info(`No money on hool set work : ${numberOfWorkHours} hours`);
        await this.setWork(hoolNumber, numberOfWorkHours);
      }
    }
  }

  async countNummberOfAvailableBeerTasks(money: number, priceBeer: number) {
    return Math.floor(money / priceBeer);
  }

  async clickOnBeerIcon(hoolNumber: number, numberOfPossibleTasks: number, numberOfCurrentTasks: number) {
    for (let i = numberOfCurrentTasks + 1; i <= 15; i++) {
      console.log(`Liczba potenc taskow: ` + numberOfPossibleTasks);
      try {
        await this.gameClick(this.beerIconLocator);
      } catch {
        await this.closeHeadBar(hoolNumber);
      }

      if (numberOfPossibleTasks == 0) {
        await this.closeHeadBar(hoolNumber);
        break;
      }

      if (i == 15) {
        log.info(`Max number of task reached closing beer bar`);
        await this.closeHeadBar(hoolNumber);
      }
      numberOfPossibleTasks--;
    }
  }

  async openTeam() {
    if (!(await this.isVisibleElement(this.closeTeamIcon))) {
      await this.gameClick(this.teamLink);
    }
  }

  async closeHoolAvatar(hoolNumber: number) {
    const closeHoolIcon = `#hool${hoolNumber} img[src="img/3.jpg"]`;
    await this.gameClick(closeHoolIcon);
  }

  async closeHeadBar(hoolNumber: number) {
    const closeHeadBarIcon = `#bar${hoolNumber} img[src="img/3.jpg"]`;
    await this.gameClick(closeHeadBarIcon);
  }

  async getPriceBeear(hoolNumber: number) {
    const priceLocator = `(//*[@id='bar${hoolNumber}-inner']//td//tbody//tr//td//b)[3]`;
    if (await this.isVisibleElement(priceLocator)) {
      const priceTemp = await this.storeText(priceLocator);
      const price = priceTemp.split(" ")[0];
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
      await this.clickHoolAvatar(hoolNumber);
      await this.gameClick(hoolHeadBarLocator);
    }
  }

  async clickHoolAvatar(hoolNumber: number) {
    const hoolAvatarLocator = `#ekipa-inner a[onclick="wopen('hool${hoolNumber}','menu=ekipa&action=hool&h=${hoolNumber}'); return false;"]`;
    await this.gameClick(hoolAvatarLocator);
    await this.gameClick(this.closeTeamList);
  }

  async setWork(hoolNumber: number, numberOfWorkHours: number) {
    const workBarLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(2) td:nth-child(3) a`;
    const closeWorkWindow = `#praca${hoolNumber} img[src="img/3.jpg"]`;
    const toWorkButton = `//a[contains(text(),'to work')]`;
    await this.openTeam();
    await this.clickHoolAvatar(hoolNumber);

    await this.gameClick(workBarLocator);

    await this.page.locator("select").selectOption(numberOfWorkHours.toString());
    await this.gameClick(toWorkButton);
    await this.gameClick(closeWorkWindow);
    await this.closeHoolAvatar(hoolNumber);
    await this.closeHeadBar(hoolNumber);
  }
}
