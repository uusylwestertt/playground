import { Page } from "@playwright/test";
import BasePage from "./basePage";
import { sleep } from "../tests/heads.spec";

export class HoolDetails extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      teamLink: `(//a[contains(text(),'Team')])[1]`,
      closeTeamList: `#ekipa img[src="img/3.jpg"]`,
      closeNewsButton: `#news a[href="#"]`,
      hoolItem: `#ekipa-inner table:nth-child(3) td img`,
    };
  }

  async countHools() {
    await sleep(100);
    return await this.countElementsOnPage(this.elements.hoolItem);
  }

  async clickHoolAvatar(hoolNumber: number) {
    const hoolAvatarLocator = `#ekipa-inner a[onclick="wopen('hool${hoolNumber}','menu=ekipa&action=hool&h=${hoolNumber}'); return false;"]`;

    if(await this.isElementVisibileBoolean(this.elements.closeNewsButton)){
        await this.click(this.elements.closeNewsButton)
    }

    await this.gameClick(hoolAvatarLocator);
    if (await this.isVisibleElement(this.elements.closeTeamList)) {
      await this.gameClick(this.elements.closeTeamList);
    }
  }

  async hoolNumberOfCurrentTasks(hoolNumber: number) {
    return await this.countElementsOnPage(`#hool${hoolNumber}-inner table:nth-child(7) td`);
  }

  async getHoolCash(hoolNumber: number) {
    const cashLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(1) td:nth-child(2)`;
    const cashTmp = await this.storeText(cashLocator);
    const cash = cashTmp.split(" ")[0];
    return Number(cash);
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

  async clickOnBeerIcon(hoolNumber: number, numberOfPossibleTasks: number, numberOfCurrentTasks: number) {
    const beerIconLocator = `img[src="http://www.hoolsgame.com/img/game/img_bar/piwo.jpg"]`;
    const closeHeadBarIcon = `#bar${hoolNumber} img[src="img/3.jpg"]`;
    const closeHoolIcon = `#hool${hoolNumber} img[src="img/3.jpg"]`;

    for (let i = numberOfCurrentTasks + 1; i <= 20; i++) {
      if (await this.isVisibleElement(beerIconLocator)) {
        await this.gameClick(beerIconLocator);
      } else {
        await this.clickHoolHeadBar(hoolNumber);
        await this.gameClick(beerIconLocator);
      }
      numberOfPossibleTasks--;

      if (numberOfPossibleTasks == 0) {
        const workBarLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(2) td:nth-child(3)`;
        const closeWorkWindow = `#praca${hoolNumber} img[src="img/3.jpg"]`;
        const toWorkButton = `//a[contains(text(),'to work')]`;
        await this.click(closeHeadBarIcon);
        await this.click(workBarLocator);
        await this.click(toWorkButton);
        await this.gameClick(closeWorkWindow);
        await this.gameClick(closeHoolIcon);
        break;
      }

      if (i == 20 && (await this.isElementVisibileBoolean(closeHeadBarIcon))) {
        await this.gameClick(closeHeadBarIcon);
        // await this.gameClick(closeHoolIcon);
      }
    }
  }

  countNumberOfBeerTasks(money: number, priceBeer: number) {
    return Math.floor(money / priceBeer);
  }

  async testMethod(hoolNumber: number) {
    const closeTeamIcon = `#ekipa img[src="img/3.jpg"]`

    if(!await this.isVisibleElement(closeTeamIcon)) {
        await this.clickTeamButton();
    }
    
    await this.clickHoolAvatar(hoolNumber);
    const numberOfCurrentTasks = await this.hoolNumberOfCurrentTasks(hoolNumber);
    const cashOnHool = await this.getHoolCash(hoolNumber);
    await this.clickHoolHeadBar(hoolNumber);

    const closeHoolIcon = `#hool${hoolNumber} img[src="img/3.jpg"]`;
    await this.gameClick(closeHoolIcon)

    const priceBeer = await this.getPriceBeear(hoolNumber);
    const closeHeadBarIcon = `#bar${hoolNumber} img[src="img/3.jpg"]`;
    if (priceBeer != null) {
      const numberOfAvilableTasksWithMoney = this.countNumberOfBeerTasks(cashOnHool, priceBeer);

      if (numberOfAvilableTasksWithMoney > 0) {
        await this.clickOnBeerIcon(hoolNumber, numberOfAvilableTasksWithMoney, numberOfCurrentTasks);
      } else {
        await this.gameClick(closeHeadBarIcon);
      }
    } else {
      
     
      await this.gameClick(closeHeadBarIcon);
    //   await this.gameClick(closeHoolIcon);
    }
  }

  async clickTeamButton() {
    if (await this.isElementVisibileBoolean(this.elements.closeNewsButton)) {
      await this.click(this.elements.closeNewsButton);
    }
    await this.gameClick(this.elements.teamLink);
  }

  async setHeadTraining() {
    const numberOfHolls = await this.countHools();
    for (let hoolNumber = 21; hoolNumber < numberOfHolls; hoolNumber++) {
      await this.testMethod(hoolNumber);
    }
  }
}
