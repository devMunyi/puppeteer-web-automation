"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = yield browser.newPage();
    const url = 'http://localhost/super-lender';
    yield page.goto(url);
    const env = process.env;
    if (env.MY_USER !== undefined && env.MY_PASS !== undefined) {
        yield page.waitForSelector('#inp_email');
        yield page.type('#inp_email', env.MY_USER, { delay: 100 });
        yield page.waitForSelector('#inp_password');
        yield page.type('#inp_password', env.MY_PASS, { delay: 100 });
    }
    else {
        console.error('Username or password is not defined in the environment variables.');
    }
    yield page.waitForSelector('button[type="submit"]');
    yield page.click('button[type="submit"]');
    yield page.waitForNavigation({ waitUntil: 'networkidle0' });
    yield page.evaluate(() => {
        const link = document.querySelector('a[href="incoming-payments"]');
        if (link) {
            link.click();
        }
        else {
            console.error('Element not found');
        }
    });
    yield page.waitForSelector('a[href="?add-edit"]');
    yield page.evaluate(() => {
        const newLink = document.querySelector('a[href="?add-edit"]');
        if (newLink) {
            newLink.click();
        }
        else {
            console.error('New element not found');
        }
    });
    yield page.waitForSelector('a[href="#tab_2"]');
    yield page.evaluate(() => {
        const tab2Link = document.querySelector('a[href="#tab_2"]');
        if (tab2Link) {
            tab2Link.click();
        }
        else {
            console.error('Tab_2 element not found');
        }
    });
    const [fileChooser] = yield Promise.all([
        page.waitForFileChooser({ timeout: 5000 }),
        page.waitForSelector('#file_'),
        page.click('#file_'),
    ]);
    const filePath = path_1.default.resolve(__dirname, 'test.csv');
    yield fileChooser.accept([filePath]);
    page.waitForSelector('#doc-upload-btn');
    page.click('#doc-upload-btn');
    yield page.waitForTimeout(10000);
    yield browser.close();
}))();
