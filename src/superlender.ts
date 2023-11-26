require('dotenv').config()
import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = 'http://localhost/super-lender';
  await page.goto(url);

  interface EnvironmentVariables {
    MY_USER?: string;
    MY_PASS?: string;
    // Add other environment variables as needed
  }
  
  // Use the defined interface for process.env
  const env: EnvironmentVariables = process.env as EnvironmentVariables;

  // Check if USERNAME and PASSWORD are defined before using them
if (env.MY_USER !== undefined && env.MY_PASS !== undefined) {
  await page.waitForSelector('#inp_email');
  await page.type('#inp_email', env.MY_USER, { delay: 100 });

  await page.waitForSelector('#inp_password');
  await page.type('#inp_password', env.MY_PASS, { delay: 100 });
} else {
  console.error('Username or password is not defined in the environment variables.');
}

  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const link = document.querySelector('a[href="incoming-payments"]') as HTMLAnchorElement;
    if (link) {
      link.click();
    } else {
      console.error('Element not found');
    }
  });

  await page.waitForSelector('a[href="?add-edit"]');

  await page.evaluate(() => {
    const newLink = document.querySelector('a[href="?add-edit"]') as HTMLAnchorElement;
    if (newLink) {
      newLink.click();
    } else {
      console.error('New element not found');
    }
  });

  await page.waitForSelector('a[href="#tab_2"]');

  await page.evaluate(() => {
    const tab2Link = document.querySelector('a[href="#tab_2"]') as HTMLAnchorElement;
    if (tab2Link) {
      tab2Link.click();
    } else {
      console.error('Tab_2 element not found');
    }
  });

  // console.log(__dirname); 
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser({ timeout: 5000 }), // 
    // page.waitForSelector('#doc-upload-btn'),
    page.waitForSelector('#file_'),
    // Click on the file input again (optional, depends on the page behavior)
    page.click('#file_'),
  ]);
  
  // Specify the file path to upload
  const filePath = path.resolve(__dirname, 'test.csv');

  // Accept the file in the file chooser dialog
  await fileChooser.accept([filePath]);

  // click upload doc button to upload the file
  page.waitForSelector('#doc-upload-btn');
  page.click('#doc-upload-btn');
  // Wait for file upload to complete (adjust the time accordingly)
  await page.waitForTimeout(10000);

  // Close the browser
  await browser.close();
})();

