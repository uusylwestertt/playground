import { Locator, Page } from "@playwright/test";
import { config } from "../config";
import { log } from "../helpers/logger";
import { getElement } from "../helpers/getElement";
import { sleep } from "../tests/heads.spec";

export type Elements = {
  [key: string]: string;
};

export default class BasePage {
  page: Page;
  elements: Elements;
  url: string;

  constructor(page: Page) {
    this.page = page;
    this.elements = {};
    this.url = config.baseUrl;
  }

  async setLocalStorage(params: { key: string; value: string }) {
    await this.page.evaluate((params) => {
      window.localStorage.setItem(params.key, params.value);
    }, params);
  }

  async addCookies(name: string, value: string, url: string) {
    await this.page.context().addCookies([{ name, value, url }]);
  }

  async goToPage(url: string) {
    await this.page.goto(url);
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  public async gameClick(electorKey: string | Locator) {
  
    try {
      await this.click(electorKey);
    } catch (error) {
      await this.closeInfoPanels();
      await this.click(electorKey);
    }
    // await this.closeInfoPanels();
  }

  public async closeInfoPanels() {
    const infoPanelCloseButton = `#info img[src="img/3.jpg"]`;
    const messagesPanelCloseButton = `#msg img[src="img/3.jpg"]`;

    try {
      if (await this.isVisibleElement(infoPanelCloseButton)) {
        await this.click(infoPanelCloseButton);
      }
    } catch (error) {
      log.info(`Info panel is under other element: ${error.message}`);
    }

    try {
      if (await this.isVisibleElement(messagesPanelCloseButton)) {
        await this.click(messagesPanelCloseButton);
      }
    } catch (error) {
      log.info(`Info panel is under other element: ${error}`);
    }
  }

  public async click(selectorKey: string | Locator) {
    log.debug(`[ACTION] Clicking on "${selectorKey}"`);
    // this.page.locator(selectorKey.toString()).click()
    const element = await getElement(selectorKey, this);
    await element.click();

    await sleep(500);
  }

  public async dblClick(selectorKey: string | Locator) {
    log.debug(`[ACTION] Double clicking on "${selectorKey}"`);
    const element = await getElement(selectorKey, this);
    return element.dblclick();
  }

  public async getListOfElements(selectorKey: string) {
    log.debug(`Get all elements with locator: '${selectorKey}'`);
    return await this.page.$$(selectorKey);
  }

  public async typeIn(selectorKey: string | Locator, text: string) {
    log.debug(`[ACTION] Typing into "${selectorKey}" - '"${text}"'`);
    const element = await getElement(selectorKey, this);
    return element.type(text);
  }

  public async fillIn(selectorKey: string | Locator, text: string) {
    log.debug(`[ACTION] Fill "${selectorKey}" with text: '"${text}"'`);
    const element = await getElement(selectorKey, this);
    return element.fill(text);
  }

  public async typeByKeyboard(text: string) {
    log.debug(`[ACTION] Insert into "${text}"`);
    return this.page.keyboard.insertText(text);
  }

  public async isElementVisibileBoolean(selectorKey: string): Promise<boolean> {
    log.debug(`Checking if element: "${selectorKey}" is visible`);
    const element = await getElement(selectorKey, this);
    const visible = element.isVisible();
    log.debug(`Visibility of element: "${selectorKey}": ${visible}`);
    return visible;
  }

  public async isVisibleElement(selectorKey: string): Promise<boolean> {
    log.debug(`Checking if element: "${selectorKey}" is visible`);
    const element = this.page.locator(selectorKey);
    const visible = element.isVisible();
    log.debug(`Visibility of element: "${selectorKey}": ${visible}`);
    return visible;
  }

  public async isElementDisabled(selectorKey: string): Promise<boolean> {
    log.debug(`Checking if element: "${selectorKey}" is disabled`);
    const element = await getElement(selectorKey, this);
    const disabled = element.isDisabled();
    return disabled;
  }
  public async clearField(selectorKey: string) {
    log.debug(`[ACTION] Clearing "${selectorKey}" field`);
    const element = await getElement(selectorKey, this);
    return element.fill("");
  }

  public async check(selectorKey: string | Locator) {
    log.debug(`[ACTION] Check "${selectorKey}" checkbox`);
    const element = await getElement(selectorKey, this);
    return element.first().check({ force: true });
  }

  public async uncheck(selectorKey: string | Locator) {
    log.debug(`[ACTION] Uncheck "${selectorKey}" checkbox`);
    const element = await getElement(selectorKey, this);
    return element.uncheck();
  }

  public async storeText(selectorKey: string | Locator, getTextFrom = "innerText"): Promise<string> {
    log.debug(`[ACTION] Store text from "${selectorKey}" element`);
    const element = await getElement(selectorKey, this);

    let value = "notSet";

    if (getTextFrom === "innerText") {
      value = await element.innerText();
    }

    if (getTextFrom === "innerHTML") {
      value = await element.innerHTML();
    }

    if (getTextFrom === "inputValue") {
      value = await element.inputValue();
    }

    return value;
  }

  public async getElementAttribute(selectorKey: string | Locator, attribute: string) {
    const element = await getElement(selectorKey, this);
    return element.getAttribute(attribute);
  }

  public async selectFromDropDown(selectorKey: string, text: string, options: { isValueAttribute: boolean }) {
    log.debug(`[ACTION] Select "${text}" value from "${selectorKey}" dropdown`);
    const element = await getElement(selectorKey, this);
    return options.isValueAttribute ? await element.selectOption(text) : await element.selectOption({ label: text });
  }

  public async uploadFiles(selectorKey: string | Locator, path: string | string[]) {
    log.debug(`[ACTION] Send files to input element "${selectorKey}"`);
    const element = await getElement(selectorKey, this);
    await element.setInputFiles(path);
  }

  public async countElementsOnPage(selectorKey: string | Locator) {
    log.debug(`[ACTION] Count all elements with locator: "${selectorKey}"`);
    const elements = await getElement(selectorKey, this, false);
    const elementsCount = await elements.count();
    
    return elementsCount;
  }
}
