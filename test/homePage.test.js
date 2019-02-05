const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Google search automated testing', async function () {
            this.timeout(50000);
            let driver, page;

            before (async () => {
                page = new Page();
                driver = page.driver;

                // change the window size to the maximum
                driver.manage().window().maximize();
                await page.visit('https://www.google.com/');
            });

            after (async () => {
                await page.quit();
            });

            it ('find the input box and google search button', async () => {
                const result = await page.findInputAndButton();
                expect(result.inputEnabled).to.equal(true);
                expect(result.buttonText).to.include('Google');
            });

            it ('put keyword in search box and click search button', async () => {
                const result = await page.submitKeywordAndGetResult();
                expect(result.length).to.be.above(10);
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();
