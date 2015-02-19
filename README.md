# ast-test [![Build Status](https://travis-ci.org/dfcreative/ast-test.svg?branch=master)](https://travis-ci.org/dfcreative/ast-test) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Test source tree on passing some condition.


## Use

`$ npm install --save ast-test`

```js
var parse = require('esprima').parse;
var test = require('ast-test');

//catch all `foo` assignments
var rule = {
	AssignmentExpression: function (node) {
		if (node.operator !== '=') return false;
		return node.left.name === 'foo';
	}
};

test(parse('foo = 1;').body[0], rule) //true
test(parse('var foo = 1;').body[0], rule) //false
```


## API

### test(Node, testRules) → Boolean

Test whether node passes test rules passed. `testRules` is an object containing node types as keys and testing functions as values. Matched nodes are tested with according testing functions, and if matched none — test returns false. You can declare node supertypes to match, in that case they will be checked beforehead.

```js
var rule = {
	Expression: function (node) {
		return true;
	},
	AssignmentExpression: function (node) {
		if (node.operator !== '=') return false;
		return node.left.name === 'foo';
	}
};

test(parse('foo = 1;').body[0].expression, rule); //true
test(parse('bar = 1;').body[0].expression, rule); //false
test(parse('var foo = 1;').body[0], rule); //false
```


[![NPM](https://nodei.co/npm/ast-test.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ast-test/)