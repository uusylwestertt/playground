import { Page, TestInfo, test } from "@playwright/test";
import BasePage from "../src/pages/basePage";
import { config } from "../config";
import { LoginPage } from "../src/pages/loginPage";
import { Dashboard } from "../src/pages/dashboard";
import { HeadTraining } from "../src/pages/headTraining";
import { log } from "../src/helpers/logger";

test.describe("Head", async () => {
  let dashboard: Dashboard;
  let headTraining: HeadTraining;

  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    headTraining = new HeadTraining(page)
    await basePage.goToPage(config.baseUrl);
    await loginPage.login();
  });

  test.afterEach(screenshotOnFailure)
  test("Case 1: Search tutor by email", async () => {
    // await sleep(1000);
    await dashboard.clickTeamButton();
    for(let i =1; i <= 2; i++){
      log.info('RUN = '+ i)
      await headTraining.runTraining();
      console.log('Wait 10 min to next run')
      await sleep (600000)
    }
  
  });
});

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function screenshotOnFailure({ page }: { page: Page }, testInfo: TestInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Get a unique place for the screenshot.
    const screenshotPath = testInfo.outputPath(`${testInfo.title}.png`);
    // Add it to the report.
    testInfo.attachments.push({ name: 'screenshot', path: screenshotPath, contentType: 'image/png' });
    // Take the screenshot itself.
    await page.screenshot({ path: screenshotPath, timeout: 5000 });
  }
}