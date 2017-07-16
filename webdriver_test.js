var url = require('url');
var path = require('path');
var request = require('request-promise');
var _ = require('lodash');

var BASE_URL = {
    protocol: 'http',
    hostname: 'localhost',
    port: 9515
};

function addSession(pathname, sessionId) {
    return path.join('session', sessionId, pathname);
}

function get(path) {
    var uri = url.format(_.extend({}, BASE_URL, {pathname: path}));
    console.log('>>>', uri);
    return request({
        url: uri
    });
}

function post(path, data) {
    var uri = url.format(_.extend({}, BASE_URL, {pathname: path}));
    console.log('>>>', uri);
    return request({
        method: 'POST',
        url: uri,
        body: data,
        json: true
    });
}

var desiredCapabilities = {"desiredCapabilities": {"browserName": "chrome", "count": 1, "loggingPrefs": {"devtools": "ALL"}, "chromeOptions": {"debuggerAddress": "127.0.0.1:9222", "devToolsEventsToLog": ["CSS.styleSheetAdded", "DOM.documentUpdated"]}}};

return post('session', desiredCapabilities)
    .then(function (sessionInfo) {
        console.log(sessionInfo);
        var sessionId = sessionInfo.sessionId;
        return post(addSession('chromium/send_command_and_get_result', sessionId), {"cmd": "CSS.enable", "params": {}})
            .then(post.bind(null, addSession('execute', sessionId), {"script": "window.location.href = 'http://www.google.com';", "args": []}))
            .then(post.bind(null, addSession('log', sessionId), {"type": "devtools"}))
            .then(function (devToolsLogs) {
                console.log(JSON.stringify(devToolsLogs));
            });
    })
    .catch(console.error);
