var exec = require('cordova/exec');

// check: resolves {available, versionCode, flexibleAllowed, immediateAllowed, installStatus, stalenessDays}.
// startFlexible: onEvent receives {status: 'downloading'|'downloaded'|'installed'|'failed'|'canceled'|'accepted', bytes, total}.
// complete: restarts the app into the downloaded update.
module.exports = {
    check: function () {
        return new Promise(function (resolve, reject) { exec(resolve, reject, 'PlayAppUpdate', 'check', []); });
    },
    startFlexible: function (onEvent, onError) {
        exec(onEvent, onError, 'PlayAppUpdate', 'startFlexible', []);
    },
    startImmediate: function () {
        return new Promise(function (resolve, reject) { exec(resolve, reject, 'PlayAppUpdate', 'startImmediate', []); });
    },
    complete: function () {
        return new Promise(function (resolve, reject) { exec(resolve, reject, 'PlayAppUpdate', 'complete', []); });
    }
};
