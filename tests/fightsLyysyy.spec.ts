import BasePage from '../src/pages/basePage';

import { LoginPage } from '../src/pages/loginPage';
import { config } from '../config';
import { sleep } from '../src/pages/components';
import { Dashboard } from '../src/pages/dashboard';
import { Fights } from '../src/pages/fights';
import { log } from '../src/helpers/logger';
import { test } from '@playwright/test';

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

  test('Case 1: Start fights lyson', async () => {
    const loginLyysyy = config.loginLyysyy;
    //fights lyysyy
    log.info('Fights for lysy');
    await loginPage.login(loginLyysyy);
    await dashboardPage.clickFights();
    await fightsPage.executeFights(5, 13);
    await dashboardPage.logout();
  });
});
