let Page = require('./homePage');
const locator = require('../utils/locator');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelectorName = locator.searchButtonSelectorName;
const firstResultLink = locator.firstResultLink;

let searchInput, searchButton;

Page.prototype.findInputAndButton = async function () {
    searchInput = await this.findByName(searchInputSelectorName);
    searchButton = await this.findByName(searchButtonSelectorName);

    const result = await this.driver.wait(async function () {
        const searchButtonText = await searchButton.getAttribute('value');
        const searchInputEnableFlag = await searchInput.isEnabled();

        return {
            inputEnabled: searchInputEnableFlag,
            buttonText: searchButtonText
        }
    }, 5000);
    return result;
};

Page.prototype.submitSeleniumKeywordAndGetResult = async function () {
    await this.driver.sleep(5000);
    await this.write(searchInput, 'selenium');
};

Page.prototype.clickOnFirstLink = async function () {
  await this.driver.sleep(5000);
  return await this.findElementByXpathAndClick(firstResultLink);
}

Page.prototype.checkPageTextContent = async function (xpath) {
  await this.driver.sleep(5000);
  const elementText = await this.findElementsByXpath(xpath);
  return await this.getTextValue(elementText);
};

module.exports = Page;
