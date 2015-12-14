### Status
[![Build Status](https://travis-ci.org/creative-berserkers/proxy.svg)](https://travis-ci.org/creative-berserkers/proxy)

### Description
Simple JavaScript proxy function factory for the use with libraries like Socket.io.

To import it into your project please input the following code:

```JavaScript
var createProxyFunction = require('cb-proxy')

var proxyFunction = createProxyFunction(originalFunction, nameIdentifier)
```
### Examples

This library is intended to be used with Socket.io or simillar library, here is an example of usage:

```JavaScript

var originalFunction = function(name, args, callback) {
    //do the call server request here eg:
    //client.emit(name, args, function(error, message){
    //    callback(error, message)
    //});
}

var proxyFunction = createProxyFunction( originalFunction, 'remote-function-name') //this name will be passed to callback as first argument

var resultPromise = proxyFunction('my first argument', 'my second argument') //both arguments will be passed to callback

resultPromise.then((result)=>{
    //do something with result
},(error)=>{
    //or handle error
})
```

### Designed for currying

Reason for having first argument as callback is the possibility to use curry function to bind first argument.

```JavaScript
var R = require('ramda')

var originalFunction = function(name, args, callback) {}

var proxyFunction = R.curry(createProxyFunction)(originalFunction)

var myPositionFunction = proxyFunction('position-service')
var myAttackFunction = proxyFunction('attack-service')
```
