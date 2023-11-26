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
const puppeteer_1 = __importDefault(require("puppeteer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome-stable'
    });
    const page = yield browser.newPage();
    yield page.setViewport({ width: 1080, height: 2048 });
    const url = 'https://typing-speed-test.aoeu.eu/';
    yield page.goto(url);
    yield page.waitForSelector('.nextword');
    const words = yield page.evaluate(() => {
        const wordElements = document.querySelectorAll('.nextword');
        const wordList = [];
        const currentWord = document.querySelector('.currentword');
        if (currentWord) {
            wordList.push(currentWord.textContent || '');
        }
        wordElements.forEach((elem) => {
            if (elem.textContent) {
                wordList.push(elem.textContent);
            }
        });
        return wordList;
    });
    for (let i = 0; i < words.length; i++) {
        yield page.type('#input', words[i]);
        yield page.keyboard.press('Space');
    }
}))();
