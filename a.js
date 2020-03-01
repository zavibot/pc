//@ts-check
var puppeteer = require("puppeteer-core")

;(async () => {
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
    "--load-extension=/Volumes/private/webpage-screenshot/ctrl.vi-extension,/Volumes/private/webpage-screenshot/frontend/bundle",
    "--user-data-dir=/Volumes/private/pc" + "/p/" + Math.random(),
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
})()
