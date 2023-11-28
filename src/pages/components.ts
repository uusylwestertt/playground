import BasePage from './basePage';
import { log } from '../helpers/logger';
import { Page } from '@playwright/test';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function openTeam(page: Page) {
  const basePage = new BasePage(page);
  const closeTeamIcon = `#ekipa img[src="img/3.jpg"]`;
  const teamLink = `(//a[contains(text(),'Team')])[1]`;
  if (!(await basePage.isVisibleElement(closeTeamIcon))) {
    await basePage.gameClick(teamLink);
  }
}

export async function countAllHools(page: Page) {
  const basePage = new BasePage(page);
  const hoolItem = `#ekipa-inner table:nth-child(3) td img`;
  await sleep(100);
  return await basePage.countElementsOnPage(hoolItem);
}

export async function clickHoolAvatar(hoolNumber: number, page: Page) {
  const basePage = new BasePage(page);
  const hoolAvatarLocator = `#ekipa-inner a[onclick="wopen('hool${hoolNumber}','menu=ekipa&action=hool&h=${hoolNumber}'); return false;"]`;
  const closeTeamList = `#ekipa img[src="img/3.jpg"]`;
  await basePage.gameClick(hoolAvatarLocator);
  await basePage.gameClick(closeTeamList);
}

export async function hoolNumberOfCurrentTasks(hoolNumber: number, page: Page) {
  const basePage = new BasePage(page);
  return await basePage.countElementsOnPage(`#hool${hoolNumber}-inner table:nth-child(7) td`);
}

export async function getHoolCash(hoolNumber: number, page: Page) {
  const basePage = new BasePage(page);
  const cashLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(1) td:nth-child(2)`;
  const cashTmp = await basePage.storeText(cashLocator);
  const cash = cashTmp.split(' ')[0];
  return Number(cash);
}

export async function closeHoolAvatar(hoolNumber: number, page: Page) {
  const basePage = new BasePage(page);
  const closeHoolIcon = `#hool${hoolNumber} img[src="img/3.jpg"]`;
  await basePage.gameClick(closeHoolIcon);
}

export async function setWork(hoolNumber: number, numberOfWorkHours: number, page: Page) {
  log.info(`Send to work for: ${numberOfWorkHours} hours`);
  const basePage = new BasePage(page);
  const workBarLocator = `#hool${hoolNumber}-inner tr table tr:nth-child(2) td:nth-child(3) a`;
  const closeWorkWindow = `#praca${hoolNumber} img[src="img/3.jpg"]`;
  const toWorkButton = `//a[contains(text(),'to work')]`;
  await openTeam(page);
  await clickHoolAvatar(hoolNumber, page);

  await basePage.gameClick(workBarLocator);

  await basePage.page.locator('select').selectOption(numberOfWorkHours.toString());
  await basePage.gameClick(toWorkButton);
  await basePage.gameClick(closeWorkWindow);
  await closeHoolAvatar(hoolNumber, page);
}
