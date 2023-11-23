import { Page, TestInfo, test } from "@playwright/test";
import BasePage from "../pages/basePage";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { Dashboard } from "../pages/dashboard";
import { HoolDetails } from "../pages/hoolDetails";
import { log } from "../helpers/logger";

test.describe("Head", async () => {
  // let basePage: BasePage;
  // let loginPage: LoginPage;
  let dashboard: Dashboard;
  let hoolDetails: HoolDetails;

  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    hoolDetails = new HoolDetails(page);
    await basePage.goToPage(config.baseUrl);
    await loginPage.login();
  });

  test.afterEach(screenshotOnFailure)
  test("Case 1: Search tutor by email", async () => {
    // await dashboard.clickTeamButton();
    await hoolDetails.clickTeamButton()
    for(let i = 0; i <=100; i++) {
      log.info(`Start Run: ${i}`)
      await hoolDetails.setHeadTraining();
      log.info(`Endo Fo Run: --- ${i} --- waiting ...`)
      await sleep(600000)
      await hoolDetails.clickTeamButton()
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