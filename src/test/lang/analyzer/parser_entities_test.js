/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {Streams} from '@masala/parser';
import Parser from '../../../lib/lang/analyzer/parser';
import Ast from '../../../lib/lang/analyzer/ast';

function entities(s) {
    return Parser.entities().parse(Streams.ofString(s)).value;
}

export default {
    setUp: function (done) {
        done();
    },

    'parse constant definition': function (test) {
        test.expect(1);
        test.deepEqual(
            entities('def Ultimate = 42').array(),
            [
                Ast.definition('Ultimate', Ast.constant(42))
            ],
            'should accept ultimate definition.');
        test.done();
    },

    'parse Identity definition': function (test) {
        test.expect(1);
        test.deepEqual(
            entities('def Identity = { x -> x }').array(),
            [
                Ast.definition('Identity', Ast.abstraction('x', Ast.ident('x')))
            ],
            'should accept identity definition.');
        test.done();
    },

    'parse main definition': function (test) {
        test.expect(1);
        test.deepEqual(
            entities('def _ = { x -> x } 42').array(),
            [
                Ast.main(Ast.application(Ast.abstraction('x', Ast.ident('x')), Ast.constant(42)))
            ],
            'should accept identity definition.');
        test.done();
    },

    'parse multiple definitions': function (test) {
        test.expect(1);
        test.deepEqual(
            entities('def the_identity = { x -> x } def _ = the_identity 42').array(),
            [
                Ast.definition('the_identity', Ast.abstraction('x', Ast.ident('x'))),
                Ast.main(Ast.application(Ast.ident('the_identity'), Ast.constant(42)))
            ],
            'should accept identity and an application definitions.');
        test.done();
    },
}
