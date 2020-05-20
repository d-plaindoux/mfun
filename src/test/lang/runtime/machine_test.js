/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astObjcode from '../../../lib/lang/compiler/ast-objcode';
import astResult from '../../../lib/lang/runtime/ast-result';
import engineFactory from '../../../lib/lang/toplevel/evaluator'

function valueOf(r) {
    return r.onFailure(e => {
        throw e;
    }).success();
}

export default {
    setUp: function (done) {
        done();
    },

    'execute a constant': function (test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(
            valueOf(engine.apply('def _ = 42')),
            [astResult.constant(42)],
            'execute a constant.');
        test.done();
    },

    'execute an abstraction returning a constant': function (test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(
            valueOf(engine.apply('def _ = { a -> 1 }')),
            [astResult.closure([astObjcode.constant(1), astObjcode.returns], [])],
            'execute a constant.');
        test.done();
    },

    'execute an abstraction': function (test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(
            valueOf(engine.apply('def _ = { a -> a }')),
            [astResult.closure([astObjcode.access(0), astObjcode.returns], [])],
            'execute a constant.');
        test.done();
    },

    'execute a definition': function (test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(
            valueOf(engine.apply('def id = { a -> a }')),
            [astResult.closure([astObjcode.access(0), astObjcode.returns], [])],
            'execute a definition.');
        test.done();
    },

    'execute a wrong code': function (test) {
        test.expect(1);
        const engine = engineFactory();
        try {
            valueOf(engine.apply('def _ = do 1 2'));
            test.deepEqual(true, false);
        } catch (e) {
            test.deepEqual(true, true);
        }
        test.done();
    },

    'execute an applied definition': function (test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def id = { a -> a }');
        test.deepEqual(
            valueOf(engine.apply('def _ = id -42.2e3')),
            [astResult.constant(-42.2e3)],
            'execute an applied definition.');
        test.done();
    },

    'execute an applied true definition': function (test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def true = { t -> { t } }');
        test.deepEqual(
            valueOf(engine.apply('def _ = true 42 43')),
            [astResult.constant(42)],
            'execute an applied definition.');
        test.done();
    },

    'execute an applied false definition with implicit parameters': function (test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def false = {{ _ }}');
        test.deepEqual(
            valueOf(engine.apply('def _ = false 42 43')),
            [astResult.constant(43)],
            'execute an applied definition.');
        test.done();
    },

    'execute an applied native definition': function (test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def plus = { a b -> native "plus" }');
        test.deepEqual(
            valueOf(engine.apply('def _ = plus 41 1')),
            [astResult.constant(42)],
            'execute an applied definition.');
        test.done();
    },

}
