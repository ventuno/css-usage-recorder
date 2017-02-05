# CSS Usage Recorder

## Resources
### ChromeDriver
* [Home](https://sites.google.com/a/chromium.org/chromedriver/)
* [Capabilities & ChromeOptions](https://sites.google.com/a/chromium.org/chromedriver/capabilities)
* [Source code](https://cs.chromium.org/chromium/src/chrome/test/chromedriver/README.txt)
* [Get the Code: Checkout, Build, & Run Chromium](https://www.chromium.org/developers/how-tos/get-the-code)

### Chrome
* [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol)
* [Chrome DevTools: CSS Coverage, track CSS rules usage while recording a Timeline profile](https://umaar.com/dev-tips/121-css-coverage/);

### Protractor
* [Working with Spec and Config Files](https://github.com/angular/protractor/blob/master/docs/api-overview.md)
* [WebDriver JS Extender](https://github.com/angular/webdriver-js)

## Instructions
1. Fetch the chromium source code (see Resources)
2. Apply patch file using `git apply`
3. Build ChromeDriver `ninja -C out/Default chromedriver`
4. Fetch the Protractor source code
5. Fetch the forked Webdriver JS Extender source code (run `npm install && gulp`)
6. Modify the Protractor's `package.json` so that the `webdriver-js-extender` dependecy points to the local version of the Webdriver JS Extender (run `npm install && gulp`)
7. Run the patched ChromeDriver (`./chromedriver`)
8. Start Google Chrome Canary `/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 http://localhost:9222 http://chromium.org`
9. Test running the modified version of protractor `node <path_to_loca_protractor_bin>/protractor conf.js`
