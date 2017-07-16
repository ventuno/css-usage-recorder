exports.config = {
    specs: ['todo-spec.js'],
    debuggerServerPort: 9222,
    chromeDriver: '',
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {"devtools": "ALL"},
        chromeOptions: {
            debuggerAddress: '127.0.0.1:9222',
            devToolsEventsToLog: ["CSS.styleSheetAdded"]
        }
    }
};
