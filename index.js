//@ts-check
// var puppeteer = require("puppeteer-core")
var download = require("download-git-repo")
const util = require("util")
var fetch = require("node-fetch")
var unzip = require("unzip")
const streamPipeline = util.promisify(require("stream").pipeline)
var fs = require("fs")
downloadExtension()
// startChrome()

console.log(__dirname)
async function downloadExtension() {
  const response = await fetch(
    "https://raw.githubusercontent.com/zavibot/b1/master/ext.zip",
  )
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream("a.zip"))

  fs.createReadStream("a.zip").pipe(unzip.Extract({ path: "ext" }))
}

async function startChrome() {
  var args = [
    "--load-extension=/Volumes/private/webpage-screenshot/ctrl.vi-extension",
    // "--load-extension=/Volumes/private/webpage-screenshot/frontend/bundle",
    "--user-data-dir=" + __dirname + "/" + Math.random(),
  ]
  args = [
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
    "--user-data-dir=/Volumes/private/pc" + "/p/" + Math.random(),
    // "--user-data-dir=/Volumes/private/chromedata",
    "--remote-debugging-port=0",
    "--flag-switches-begin",
    "--flag-switches-end",
    "--enable-audio-service-sandbox",
  ]
  console.log(args)
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    ignoreDefaultArgs: true,
    devtools: true,
    args,
  })
  const page = await browser.newPage()
  page.goto("http://example.com")

  // await browser.close()
}
