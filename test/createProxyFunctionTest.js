'use strict'

var assert = require('assert')
var R = require('ramda')

let createProxyFunction = require('../src/createProxyFunction')

describe('cb-proxy', () => {
    describe('createProxyFunction', () => {
        it('should work', (done) => {

            let rpc = R.curry(createProxyFunction)((name, args, callback) => {
                callback(undefined, args[0])
            })

            let myPositionFunction = rpc('position-service')
            let myAttackFunction = rpc('attack-service')

            myPositionFunction({
                x: 1,
                y: 2
            }).then((result) => {
                assert.equal(1, result.x)
                assert.equal(2, result.y)
            })

            myAttackFunction('enemy').then((result) => {
                assert.equal('enemy', result)
                done()
            })
        })

        it('should reject', (done) => {

            let rpc = R.curry(createProxyFunction)((name, args, callback) => {
                callback('some error', undefined)
            })

            let myPositionFunction = rpc('position-service')
            let myAttackFunction = rpc('attack-service')

            myPositionFunction({
                x: 1,
                y: 2
            }).then((result) => {
                throw new Error("Should not return correct result");
            }, (error) => {
                assert.equal('some error', error)
            })

            myAttackFunction('enemy').then((result) => {
                throw new Error("Should not return correct result");
            }, (error) => {
                assert.equal('some error', error)
                done()
            })
        })
    })
})
