// tests/fixtures.js
import { test as base } from '@playwright/test';
const { utils } = require('../utilities/utils');
import homePage from '../pom/HomePage';
import SignInPage from '../pom/SignInPage';

// Extend base test with custom fixtures for Utils and LandingPage
const test = base.extend({
  runner: async ({ page }, use) => {
    const utilsInstance = new utils(page);
    // await utilsInstance.navigateTo(globalData.landingPageUrl);
    await use(utilsInstance);
  },
  landingPage: async ({ page }, use) => {
    const conduitPageInstance = new homePage(page);
    await use(conduitPageInstance);
  },

  signInPage: async ({ page }, use) => {
    const signInPageInstance = new SignInPage(page);
    await use(signInPageInstance);
  },
});

export { test };
