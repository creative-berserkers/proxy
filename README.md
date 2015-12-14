### Status
[![Build Status](https://travis-ci.org/creative-berserkers/proxy.svg)](https://travis-ci.org/creative-berserkers/proxy)

Simple JavaScript proxy function factory

```JavaScript
let createProxyFunction = require('cb-proxy')

let rpc = createProxyFunction(func, name)
```


Example of usage:

```JavaScript
let proxy = createProxyFunction((name, args, callback) => {
    //do the call server request here eg:
    //client.emit(name, args, function(error, message){
    //    callback(message)
    //});
}, 'remote-function-name') //this name will be passed to callback as first argument


let resultPromise = proxy('my argument', 'my second argument') //both arguments will be passed to callback

resultPromise.then((result)=>{
    //do something with result
})
```

Reason for having first argument as callback is the possibility to use curry function to bind first argument.

```JavaScript
var R = require('ramda')
let rpc = R.curry(createProxyFunction)((name, args, callback) => {
    //do the callback here eg. callback(args[0])
})

let myPositionFunction = rpc('position-service')
let myAttackFunction = rpc('attack-service')
```
