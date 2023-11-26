import BasePage from '../pages/basePage';
import { log } from './logger';

import { Locator } from '@playwright/test';

async function getWrapper(elementName: string, pageObject: BasePage): Promise<Locator> {
  const [type, ...rest] = elementName.split(':');
  const name = rest.join(':');
  switch (type) {
    case 'TEXT': {
      log.debug(`Selecting via text "${elementName}" - exact`);
      return pageObject.page.locator(`text="${name}"`);
    }
    case 'APPROX-TEXT': {
      log.debug(`Selecting via text "${elementName}" - non exact`);
      return pageObject.page.locator(`text=${name}`);
    }
    default:
      if (elementName.includes('//')) {
        log.debug(`Selecting via xpath "${elementName}"`);
      } else {
        log.debug(`Selecting via css or locator "${elementName}"`);
      }
      return pageObject.page.locator(elementName);
  }
}

function getSelector(selectorKey: string | Locator): string {
  if (selectorKey.toString().includes('Locator@')) {
    log.warn(`The selector "${selectorKey}" is a "Locator" type, extracting selector to "String" type`);
    return extractSelector(selectorKey as Locator);
  }
  return selectorKey as string;
}

function selectorKeyWrapper(selectorKey: string | Locator, pageObject: BasePage): string {
  if (Object.prototype.hasOwnProperty.call(pageObject.elements, selectorKey as string)) {
    return pageObject.elements[selectorKey as string];
  }

  return getSelector(selectorKey);
}

export async function getElement(selectorKey: string | Locator, pageObject: BasePage, isDisplayed = true): Promise<Locator> {
  const element = await getWrapper(selectorKeyWrapper(selectorKey, pageObject), pageObject);
  const elementCount = await element.count();

  if (isDisplayed) {
    if (elementCount > 1) {
      log.warn(`There are ${elementCount} elements for: "${selectorKey}" selector, picking the first one!`);

      const getFirstElement: Locator = element.first();
      await getFirstElement.scrollIntoViewIfNeeded();
      const elementSelector: string = extractSelector(getFirstElement);

      log.debug(`Scrolling to the element with selector: "${elementSelector}"`);
      const firstElement = await getWrapper(selectorKeyWrapper(elementSelector, pageObject), pageObject);

      return firstElement;
    }

    if (elementCount !== 0) {
      log.debug(`Scrolling to the element with selector: "${element}"`);
      await element.scrollIntoViewIfNeeded();
    }
  }

  return element;
}

export const extractSelector = (locator: Locator): string => {
    const locatorName = 'Locator@';
    const selector = locator.toString();
  
    if (!selector.startsWith(locatorName)) throw Error('Error: Did not find Locator@');
  
    return selector.slice(locatorName.length);
  };