'use strict'

var Promise = require('bluebird');

module.exports = function createProxyFunction(onCall, name) {
    return function() {
        return new Promise((resolve, reject) => {
            onCall(name, Array.prototype.slice.call(arguments), (error, result) => {
                if(error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}
