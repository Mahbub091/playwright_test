import { expect } from '@playwright/test';

exports.utils = class utils {
    
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url){
        await this.page.goto(url)   
    }

    async clickOnElement(identifier){
        await this.page.locator(identifier).click();
    }

    async mouseHover(identifier){
        await this.page.locator(identifier).hover();
    }

    async fillInputBox(identifier, text){
        await this.page.locator(identifier).fill(text);
    }

    async typeInputBox(identifier, text){
        await this.page.locator(identifier).type(text);
    }

    async dblClickOnElement(identifier){
        await this.page.locator(identifier).dblclick();
    }

    async focusOnElement(identifier){
        await this.page.locator(identifier).focus();
    }

    async verifyTitle(title){
        await expect(this.page).toHaveTitle(title);
    }

    async verifyContainsUrl(url){
        await expect(this.page).toHaveURL(url);
    }

    async verifyToHaveText(identifier, expectedText){
        await expect.soft(this.page.locator(identifier)).toHaveText(expectedText);
    }

    async verifyToHaveValue(identifier, inputFieldText){
        await expect.soft(this.page.locator(identifier)).toHaveValue(inputFieldText);
    }

    async verifyContainText(identifier, expectedText){
        await expect.soft(this.page.locator(identifier)).toContainText(expectedText);
    }

    async verifyToHaveAttributes(attr, value){
        await expect.soft(this.page.locator(identifier)).toHaveAttribute(attr, value);
    }

    async verifyToHaveCss(key, value){  
        await expect.soft(this.page.locator(identifier)).toHaveCSS(key, value);
    }

    async verifyElementIsVisible(identifier){
        await expect.soft(this.page.locator(identifier)).toBeVisible();
    }

    async verifyRadioBtnChecked(identifier){
        await expect.soft(this.page.locator(identifier)).toBeChecked();
    }

    async verifyTextBoxEditable(identifier){
        await expect.soft(this.page.locator(identifier)).toBeEditable();
    }

    async verifyTextBoxEnabled(identifier){
        await expect.soft(this.page.locator(identifier)).toBeEnabled();
    }

    async verifyElementFocused(identifier){
        await expect.soft(this.page.locator(identifier)).toBeFocused();
    }


    async validateAndClick(identifier, expectedText) {
        await this.page.locator(identifier).focus();

        await expect.soft(this.page.locator(identifier)).toBeVisible(); //Waiting Here To Make Sure That Our Expected Element Is Visible
        const actualText = await this.page.locator(identifier).textContent();  // Initiating elements Text Content

                        // We're clicking on the element after validating the element's text contents
        if (actualText.trim() === expectedText) {
            await this.page.locator(identifier).click();
        } else {
            throw new Error(`Text does not match. Expected: "${expectedText}", but found: "${actualText}"`);
        }
    }

    async validateButtonAttribute (identifier, hrefAttribute) {
    const button = await this.page.locator(identifier);
    await expect(button).toBeVisible();

    const hrefValue = await button.getAttribute('href');
    expect(hrefValue).toBe(hrefAttribute);
    }

    async scrollAndClick (identifier) {
        const targetElement = this.page.locator(identifier);

        await targetElement.scrollIntoViewIfNeeded();
        await expect(targetElement).toBeVisible();

        await this.page.locator(identifier).click();
    }

    async wait(time, options = {}) {
        const { waitForSelector, waitForNetworkIdle, waitForLoadState } = options;
    
        await this.page.waitForTimeout(time * 1000);
    
        if (waitForSelector) {
          await this.page.waitForSelector(waitForSelector, { state: 'visible', timeout: time * 1000 });
        }
    
        if (waitForNetworkIdle) {
          await this.page.waitForLoadState('networkidle', { timeout: time * 1000 });
        }
    

        if (waitForLoadState) {
          await this.page.waitForLoadState(waitForLoadState, { timeout: time * 1000 });
        }
      }

      async waitForPageLoad(page, state = 'load') {
        await this.page.waitForLoadState(state);
      }

                    /////////////////////////////// ////////////////////////    /////////////////////////

  // Method to verify the text of a specific link
  async verifyLinkTextByIndex(locator, index, expectedText) {
    const selector = `${locator}:nth-of-type(${index})`;
    const actualText = await this.page.textContent(selector);
    if (!actualText.includes(expectedText)) {
      throw new Error(`Text mismatch at index ${index}: expected "${expectedText}", but got "${actualText}"`);
    }
    console.log(`Verified text for link at index ${index}: "${actualText}" matches expected "${expectedText}"`);
  }

  // Method to verify the text of multiple links
  async verifyLinksText(locator, expectedTexts) {
    for (let i = 0; i < expectedTexts.length; i++) {
      await this.verifyLinkTextByIndex(locator, i + 1, expectedTexts[i]);  // i + 1 to match nth-of-type
    }
  }
}
    

