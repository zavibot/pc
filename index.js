//@ts-check
var puppeteer = require("puppeteer-core");
const util = require("util");
var fetch = require("node-fetch");
var unzip = require("unzip");
const streamPipeline = util.promisify(require("stream").pipeline);
var createShortcut = require("create-desktop-shortcuts");
var fs = require("fs");

async function init() {
  console.log(0);
  await downloadExtension();
  console.log(0);
  create();
  console.log(0);
  startChrome();
  console.log(0);
}

init();

function create() {
  createShortcut({
    windows: {
      filePath: process.argv[0], //"node.exe", // " + __dirname + "/index.js",
      hotkey: "ALT+CTRL+F",
      name: "ZevikBots",
      arguments: __dirname + "\\index.js",
    },
  });
}

async function downloadExtension() {
  return new Promise(async resolve => {
    const response = await fetch(
      "https://raw.githubusercontent.com/zavibot/b1/master/ext.zip"
    );
    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);
    await streamPipeline(response.body, fs.createWriteStream("a.zip"));

    fs.createReadStream("a.zip").pipe(
      unzip.Extract({ path: "ext" }).on("close", () => {
        resolve();
      })
    );
  });
}

async function startChrome() {
  var args = [
    // "--disable-background-networking",
    // "--enable-features=NetworkService,NetworkServiceInProcess",
    // "--disable-background-timer-throttling",
    // "--disable-backgrounding-occluded-windows",
    // "--disable-breakpad",
    // "--disable-client-side-phishing-detection",
    // "--disable-component-extensions-with-background-pages",
    "--disable-default-apps",
    "--disable-dev-shm-usage",
    "--disable-features=TranslateUI",
    "--disable-hang-monitor",
    "--disable-ipc-flooding-protection",
    "--disable-popup-blocking",
    "--disable-prompt-on-repost",
    // "--disable-renderer-backgrounding",
    "--disable-sync",
    "--force-color-profile=srgb",
    // "--metrics-recording-only",
    "--no-first-run",
    "--enable-automation",
    // "--password-store=basic",
    // "--use-mock-keychain",
    "--auto-open-devtools-for-tabs",
    // "--load-extension=/Volumes/private/webpage-screenshot/ctrl.vi-extension,/Volumes/private/webpage-screenshot/frontend/bundle",
    `--load-extension=${__dirname}/ext`,
    `--user-data-dir=${__dirname}\\profile`,
    // "--user-data-dir=/Volumes/private/chromedata",
    "--remote-debugging-port=0",
    "--flag-switches-begin",
    "--flag-switches-end",
    "--enable-audio-service-sandbox",
  ];
  console.log(args);
  const browser = await puppeteer.launch({
    executablePath:
      // "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
    ignoreDefaultArgs: true,
    devtools: true,
    args,
  });
  const page = await browser.newPage();
  page.goto("http://example.com");

  // await browser.close()
}
