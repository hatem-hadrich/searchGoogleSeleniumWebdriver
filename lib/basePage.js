const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

let o = new chrome.Options();
//o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
//o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });
o.addArguments('--no-sandbox');
o.addArguments('--disable-dev-shm-usage');

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function (theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function (id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function (name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    // find a specific element with it's name then click
    this.findButtonAndClick = async function (name) {
      await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
      var buttonElement = await this.driver.findElement(By.name(name));
      return await buttonElement.click();
    };

    // find element of type link or button then click on it
    this.findElementByXpathAndClick = async function (xpath) {
      await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, 'Looking for element');
      var element = await this.driver.findElement(By.xpath(xpath));
      return await element.click();
    }

    // find all elements by xpath
    this.findElementsByXpath = async function (xpath) {
      await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, 'Looking for element');
      return await this.driver.findElement(By.xpath(xpath));
    }

    // fill input web elements
    this.write = async function (el, txt, options = Key.ENTER) {
        return await el.sendKeys(txt, options);
    };

    // get the text value of element
    this.getTextValue = async function (element) {
      return await element.getText();
    }

    // get page title
    this.getTitle = async function () {
      return await this.driver.getTitle();
    }
};

module.exports = Page;
