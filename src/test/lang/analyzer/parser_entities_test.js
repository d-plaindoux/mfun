/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {Streams} from '@masala/parser';
import Parser from '../../../lib/lang/analyzer/parser';
import Ast from '../../../lib/lang/analyzer/ast';

export default {
    setUp: function (done) {
        done();
    },

    'parse constant definition': function (test) {
        test.expect(1);
        test.deepEqual(
            Parser.entities().parse(Streams.ofString('def Ultimate 42')).value.array(),
            [
                Ast.definition('Ultimate', Ast.constant(42))
            ],
            'should accept ultimate definition.');
        test.done();
    },

    'parse Identity definition': function (test) {
        test.expect(1);
        test.deepEqual(
            Parser.entities().parse(Streams.ofString('def Identity { x -> x }')).value.array(),
            [
                Ast.definition('Identity', Ast.abstraction('x', Ast.ident('x')))
            ],
            'should accept identity definition.');
        test.done();
    },

    'parse main definition': function (test) {
        test.expect(1);
        test.deepEqual(
            Parser.entities().parse(Streams.ofString('{ x -> x } 42')).value.array(),
            [
                Ast.main(Ast.application(Ast.abstraction('x', Ast.ident('x')), Ast.constant(42)))
            ],
            'should accept identity definition.');
        test.done();
    },

    'parse multiple definitions': function (test) {
        test.expect(1);
        test.deepEqual(
            Parser.entities().parse(Streams.ofString('def Identity { x -> x } Identity 42')).value.array(),
            [
                Ast.definition('Identity', Ast.abstraction('x', Ast.ident('x'))),
                Ast.main(Ast.application(Ast.ident('Identity'), Ast.constant(42)))
            ],
            'should accept identity and an application definitions.');
        test.done();
    },
}
