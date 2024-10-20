import { test, expect } from './fixtures';
import globalData from "../testData/globalData.json";
import conduitPage from "../pom/HomePage";
import signInPage from "../pom/SignInPage"
import HomePage from '../pom/HomePage';

  
  test.describe('Validating User Interaction', () => {
    test('User Creates New Article', async ({ runner }) => {
        await runner.navigateTo(globalData.landingPageUrl);
        await runner.verifyTitle("Conduit | Practice Test Automation");
        await runner.verifyContainsUrl(globalData.landingPageUrl);
        await runner.clickOnElement(HomePage.signInButton);
        await runner.verifyToHaveText(signInPage.pageHeaderText, "Sign in");
        await runner.typeInputBox(signInPage.signInEmailField, "test");
        await runner.verifyElementIsVisible(signInPage.signInPasswordField)
    });
  
  });
  

