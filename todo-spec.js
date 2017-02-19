var _ = require('lodash');
var fs = require('fs');
describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
        browser.get('http://localhost:8000');
        browser.driver.sendCommand('DOM.enable', {});
        browser.driver.sendCommand('CSS.enable', {});
        browser.driver.sendCommand('CSS.startRuleUsageTracking', {});
        element(by.id('mySpan')).click();
        var cssRuleUsage = browser.driver.sendCommandAndGetResult('CSS.stopRuleUsageTracking', {});
        var allStyleSheetHeaders = browser.driver.getAllStyleSheets();
        Promise.all([cssRuleUsage, allStyleSheetHeaders]).then(function (res) {
            var ruleUsage = res[0].ruleUsage;
            var allStyleSheetHeaders = res[1];
            var styleSheetIds = _.uniq(_.map(ruleUsage, 'styleSheetId'));
            var styleSheetHeadersMap = _.zipObject(_.map(allStyleSheetHeaders, 'styleSheetId'), allStyleSheetHeaders);

            var styleSheetsPromises = _.map(styleSheetIds, function (styleSheetId) {
                return browser.driver.sendCommandAndGetResult('CSS.getStyleSheetText', {styleSheetId: styleSheetId});
            });
            return Promise.all(styleSheetsPromises).then(function (styleSheets) {
                return [ruleUsage, styleSheetHeadersMap, _.zipObject(styleSheetIds, styleSheets)];
            });
        }).then(function (res) {
            var ruleUsage = res[0];
            var styleSheetHeadersMap = res[1];
            var styleSheetMap = res[2];
            var usedRules = [];
            _.forEach(ruleUsage, function (rule) {
                console.log('<<<');
                var usg = rule.used + ' ' + styleSheetHeadersMap[rule.styleSheetId].sourceURL + ' ' + getRule(rule.range, styleSheetMap[rule.styleSheetId])[0];
                console.log(usg);
                usedRules.push(usg);
                console.log('<<<');
            });
            fs.writeFileSync('out.txt', JSON.stringify(usedRules));
        });
    });
});

function getRule (range, styleSheet) {
    if (!styleSheet.lines) {
        styleSheet.lines = styleSheet.text.split('\n');
    }
    var rule = [];
    for (var i = range.startLine; i <= range.endLine; i++) {
        var line = _.trim(styleSheet.lines[i]);
        rule.push(line);
    }
    return rule;
}
