const puppeteer = require('puppeteer');

const headers = new Map([
    ['Accept-Language', 'en-US'],
    ['Content-Language', 'en-US']
]);

exports.run = async (client, message, args) => {

    const argsString = args.join(' ');
    if (args === '') return new Error('You need to input an url.');

    const url = /^https?:\/\//.test(argsString) ? argsString : `http://${argsString}`;

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        ignoreHTTPSErrors: true,
        slowMo: 250
    });

    setTimeout(() => {
        browser.close();
    }, 30000);

    const page = await browser.newPage();

    await page.setViewport({
        width: 1366,
        height: 768
    });

    await page.setJavaScriptEnabled(true);
    page.setExtraHTTPHeaders(headers);

    await page.goto(url, {
        waitUntil: 'networkidle'
    });
    const result = await page.screenshot();

    browser.close();

    message.channel.send({
        files: [{
            attachment: result,
            name: 'screenshot.png'
        }]
    });
};

exports.help = {
    name: 'screenshot',
    description: 'Make a screenshot of an url.',
    usage: 'screenshot [url]'
};