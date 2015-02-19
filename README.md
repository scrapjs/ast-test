# ast-test [![Build Status](https://travis-ci.org/dfcreative/ast-test.svg?branch=master)](https://travis-ci.org/dfcreative/ast-test) [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Test source tree on some condition.


## Use

`$ npm install --save ast-test`

```js
var parse = require('esprima').parse;
var test = require('ast-test');

//catch all `foo` assignments
var rule = {
	AssignmentExpression: function(node){
		if (node.operator !== '=') return false;
		return node.left.name === 'foo';
	}
};

test(parse('foo = 1;').body[0], rule) //true
test(parse('var foo = 1;').body[0], rule) //false
```


## API

### test(Node, test) → Boolean

Test whether node passes the test condition. All added rules are tested against the node passed.


[![NPM](https://nodei.co/npm/ast-test.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ast-test/)