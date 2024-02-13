import BasePage from '../src/pages/basePage';

import { LoginPage } from '../src/pages/loginPage';
import { config } from '../config';
import { sleep } from '../src/pages/components';
import { Dashboard } from '../src/pages/dashboard';
import { Fights } from '../src/pages/fights';
import { Users } from '../src/enums/users';
import { test } from '@playwright/test';

let loginPage: LoginPage;
let dashboardPage: Dashboard;
let fightsPage: Fights;

test.describe('Head', async () => {
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
      await fightsPage.executeFightsBorsuk();
    } else if (login == Users.lysy) {
      await fightsPage.executeFightsLyysyy();
    } else {
      await fightsPage.executeFightsVegeta();
    }
  });
});
