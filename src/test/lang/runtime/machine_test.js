
import astObjcode from '../../../lib/lang/compiler/ast-objcode';
import astResult from '../../../lib/lang/runtime/ast-result';
import engineFactory from '../../../lib/lang/toplevel/evaluator'

function destruct(r) {
    return r.onFailure(e => { throw e; }).success();
}

export default {
    setUp: function(done) {
        done();
    },

    'execute a constant': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('42')),
                       [ astResult.constant(42) ],
                       'execute a constant.');
        test.done();
    },

    'execute an abstraction returning a constant': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('{ a -> 1 }')),
            [ astResult.closure([astObjcode.constant(1), astObjcode.returns ], []) ],
            'execute a constant.');
        test.done();
    },

    'execute an abstraction': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('{ a -> a }')),
                       [ astResult.closure([astObjcode.access(1), astObjcode.returns ], []) ],
                       'execute a constant.');
        test.done();
    },

    'execute a definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('def ID { a -> a }')),
                       [ astResult.closure([ astObjcode.access(1), astObjcode.returns ], []) ],
                       'execute a definition.');
        test.done();
    },

    'execute a wrong code': function(test) {
        test.expect(1);
        const engine = engineFactory();
        try {
            destruct(engine.apply('do 1 2'));
            test.deepEqual(true,false);
        } catch (e) {
            test.deepEqual(true,true);
        }
        test.done();
    },

    'execute an applied definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def ID { a -> a }');
        test.deepEqual(destruct(engine.apply('ID 42')),
                       [ astResult.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied true definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def true { t f -> t }');
        test.deepEqual(destruct(engine.apply('true 42 43')),
                       [ astResult.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied false definition with implicit parameters': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def false { { _ } }');
        test.deepEqual(destruct(engine.apply('false 42 43')),
                       [ astResult.constant(43) ],
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied native definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def plus { a b -> native "plus" }');
        test.deepEqual(destruct(engine.apply('plus 41 1')),
                       [ astResult.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

}
