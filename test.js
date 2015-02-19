var assert = require('chai').assert;
var test = require('./');
var parse = require('esprima').parse;
var generate = require('escodegen').generate;


describe('ast-test', function(){
	it('bad test', function () {
		var node = parse('var a = 1 + 1;');
		var tester = {
			VariableDeclarator: function (node) {
				return node.id.name === 'a';
			}
		};

		assert.notOk(test(node, tester));
		assert.ok(test(node.body[0].declarations[0], tester));
	});

	it('empty tester', function(){
		assert.throws(function(){
			test({});
		}); //true
	});

	it('readme example', function () {
		//catch all `foo` assignments
		var rule = {
			AssignmentExpression: function (node) {
				if (node.operator !== '=') return false;
				return node.left.name === 'foo';
			}
		};
		assert.ok(test(parse('foo = 1;').body[0].expression, rule)); //true
		assert.notOk(test(parse('bar = 1;').body[0].expression, rule)); //false
		assert.notOk(test(parse('var foo = 1;').body[0], rule)); //false
	});

	it('generalized test', function () {
		//catch all `foo` assignments
		var rule = {
			Expression: function (node) {
				return true;
			},
			AssignmentExpression: function (node) {
				if (node.operator !== '=') return false;
				return node.left.name === 'foo';
			}
		};

		assert.ok(test(parse('foo = 1;').body[0].expression, rule)); //true
		assert.notOk(test(parse('bar = 1;').body[0].expression, rule)); //false
		assert.notOk(test(parse('var foo = 1;').body[0], rule)); //false
	});
});