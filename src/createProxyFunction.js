'use strict'

var Promise = require('bluebird');

module.exports = function createFoxRPC(onCall, name) {
    return function() {
        return new Promise((resolve, reject) => {
            onCall(name, Array.prototype.slice.call(arguments), (result) => {
                resolve(result)
            })
        })
    }
}
