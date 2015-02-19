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
			var node = path.node, type = node.type;
			var nodeTypes = types.getSupertypeNames(type);

			//test supertypes first
			for (var i = 0, l = nodeTypes.length; i < l; i++) {
				type = nodeTypes[i];
				if (rules[type]) {
					if (!rules[type](node)) {
						testResult = false;
						this.abort();
						return false;
					}
				}
			}

			//test specific type
			type = node.type;
			if (!rules[type] || !rules[type](node)) {
				testResult = false;
				this.abort();
				return false;
			}

			return false;
		}
	});

	return testResult;
}


module.exports = test;