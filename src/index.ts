import puppeteer from "puppeteer";

(async () => {
  // Initialize browser instance
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable'
  });

  // Initialize browser page
  const page = await browser.newPage();

  // Set page size
  await page.setViewport({ width: 1080, height: 2048 });

  // Set target URL
  const url = 'https://typing-speed-test.aoeu.eu/';

  // Go to the provided URL
  await page.goto(url);

  // Ensure targeted words are loaded
  await page.waitForSelector('.nextword');

  const words = await page.evaluate(() => {
    const wordElements = document.querySelectorAll('.nextword');
    const wordList: string[] = [];
    const currentWord = document.querySelector('.currentword');
    
    if (currentWord) {
      wordList.push(currentWord.textContent || ''); // Handle null value
    }

    wordElements.forEach((elem) => {
      if (elem.textContent) {
        wordList.push(elem.textContent);
      }
    });

    return wordList;
  });

  for (let i = 0; i < words.length; i++) {
    await page.type('#input', words[i]); // Type one word at a time
    await page.keyboard.press('Space');
  }

  // await browser.close();
})();
