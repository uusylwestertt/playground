import BasePage from '../src/pages/basePage';

import { LoginPage } from '../src/pages/loginPage';
import { config } from '../config';
import { sleep } from '../src/pages/components';
import { Dashboard } from '../src/pages/dashboard';
import { Fights } from '../src/pages/fights';
import { Users } from '../src/enums/users';
import { test } from '@playwright/test';
import { log } from '../src/helpers/logger';

let loginPage: LoginPage;
let dashboardPage: Dashboard;
let fightsPage: Fights;

test.describe('Fights', async () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new Dashboard(page);
    fightsPage = new Fights(page);
    await basePage.goToPage(config.baseUrl);
    await sleep(2000);
  });

  test('Case 1: Start fights', async () => {
    await loginPage.login();
    await dashboardPage.clickFights();
    await sleep(2000);
    const login = config.login;

    if (login == Users.borsuk) {
      log.info('Borsuk');
      await fightsPage.executeFights(3, 12, 4, 7);
    } else if (login == Users.lysy) {
      log.info('Lysy');
      await fightsPage.executeFights(5, 14, 5, 9);
    } else {
      log.info('Vegeta');
      await fightsPage.executeFights(5, 17, 6, 10);
    }
  });
});
