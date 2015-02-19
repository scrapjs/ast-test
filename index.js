/**
 * Test source tree on some condition.
 *
 * @module ast-test
 */

var types = require('ast-types');
var assert = require('assert');
var visit = types.visit;
var n = types.namedTypes;


/** Test node on condition */
function test(node, rules) {
	assert.ok(n.Node.check(node));
	assert.ok(rules);

	var testResult = true;

	visit(node, {
		visitNode: function (path) {
			var node = path.node;

			if (
				rules[node.type] &&
				rules[node.type](node)
			) {
				testResult = true;
			}
			else {
				testResult = false;
			}
			this.abort();
		}
	});

	return testResult;
}


module.exports = test;