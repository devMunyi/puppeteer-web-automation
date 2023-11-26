const puppeteer = require("puppeteer");

(async() => {

    // initialize browser instance
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome-stable'
    })

    // initialize browser page
    const page = await browser.newPage();

    // set page size
    await page.setViewport({width: 1080, height: 2048})

    // set target url 
    const url = 'https://typing-speed-test.aoeu.eu/';

    // go to the provided url
    await page.goto(url);

    // ensure targeted words are loaded
    await page.waitForSelector('.nextword');

    const words = await page.evaluate(() => {
        const wordElements = document.querySelectorAll('.nextword');
        const wordList = [document.querySelector('.currentword').innerText];

        wordElements.forEach((elem) => {
            wordList.push(elem.innerText);
        })

        return wordList;
    })


    for (let i = 0; i < words.length; i++){
        await page.type('#input', words[i]); // type one word a time
        await page.keyboard.press(String.fromCharCode(32)); // add space after typing a word, 32 is the javascript keyboard numerical for adding single space
        // => more infor on javascript keyboard equivalent number navigate to keycode.info
    }
})();

