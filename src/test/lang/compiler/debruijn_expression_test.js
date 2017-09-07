import ast from '../../../lib/lang/analyzer/ast';
import astDB from '../../../lib/lang/compiler/ast-debruijn';
import toDeBruijn from '../../../lib/lang/compiler/debruijn.js'

export default {
    setUp: function(done) {
        done();
    },

    'transform a constant': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.constant(42)),
                       astDB.constant(42),
                       'Transform a constant.');
        test.done();
    },

    'transform a native': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.native("add",2)),
                       astDB.native("add",2),
                       'Transform a native.');
        test.done();
    },

    'transform a free variable': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.ident('x')),
                       astDB.ident('x'),
                       'Transform a free variable.');
        test.done();
    },

    'transform the identity': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.ident('x'))),
                       astDB.abstraction(astDB.variable(1)),
                       'Transform the identity.');
        test.done();
    },

    'transform true function (Also Called K)': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('y', ast.ident('x')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(2))),
                       'Transform true function (Also Called K).');
        test.done();
    },

    'transform false function': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('y', ast.ident('y')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(1))),
                       'Transform false function.');
        test.done();
    },

    'transform function with hidden variable': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('x', ast.ident('x')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(1))),
                       'Transform function with hidden variable.');
        test.done();
    },
}
