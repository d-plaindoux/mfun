import astDB from '../../../lib/lang/compiler/ast-debruijn';
import astObjcode from '../../../lib/lang/compiler/ast-objcode';
import toObjcode from '../../../lib/lang/compiler/objcode.js'

export default {
    setUp: function(done) {
        done();
    },

    'compile a constant': function(test) {
        test.expect(1);
        test.deepEqual(toObjcode(astDB.constant(42)),
                       [ astObjcode.constant(42) ],
                       'Compile a constant.');
        test.done();
    },

    'compile a native': function(test) {
        test.expect(1);
        test.deepEqual(toObjcode(astDB.native("add")),
                       [ astObjcode.native("add") ],
                       'Compile a native.');
        test.done();
    },

    'compile a variable': function(test) {
        test.expect(1);
        test.deepEqual(toObjcode(astDB.variable(1)),
                       [ astObjcode.access(1) ],
                       'Compile an access.');
        test.done();
    },

    'compile an application': function(test) {
        test.expect(1);
        test.deepEqual(toObjcode(astDB.application(astDB.variable(1), astDB.variable(2))),
                       [ astObjcode.access(1), astObjcode.access(2), astObjcode.apply ],
                       'Compile an application.');
        test.done();
    },

    'compile an abstraction': function(test) {
        test.expect(1);
        test.deepEqual(toObjcode(astDB.abstraction(astDB.variable(1))),
                       [ astObjcode.closure([ astObjcode.access(1), astObjcode.returns ]) ],
                       'Compile an abstration.');
        test.done();
    },
}
