const puppeteer = require('puppeteer');

(async () => {

    // initialize browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: `/usr/bin/google-chrome` })

    // initialize browser page
    const page = await browser.newPage();

    // initialize a url to navigate
    let url = 'http://quotes.toscrape.com/';
    // url = 'https://example.com/';
    // url = 'https://developer.chrome.com/';

    // navigate to url
    await page.goto(url);

    // Set screen size
    await page.setViewport({ width: 1080, height: 2048 });

    // Take a screenshot and save it 
    // await page.screenshot({ path: 'screenshot.png' });

    // await page.waitForNavigation('https://example.com/');
    // await page.waitFor(3000)

    await page.waitForSelector('.col-md-4 a');
    await page.click('.col-md-4 a');

    // input username
    await page.waitForSelector('#username');
    await page.type('#username', 'Sam Munyi', { delay: 100 })


    // ensure password input element is on the DOM
    await page.waitForSelector('#password');
    // type the password
    await page.type('#password', 'mypassword', { delay: 100 });


    // ensure login button is on the DOM
    await page.waitForSelector('.btn.btn-primary');
    // click login button
    await page.click('.btn.btn-primary');

    // finally close the browsers
    // await browser.close();
})();