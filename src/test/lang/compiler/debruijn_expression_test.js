/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import Ast from '../../../lib/lang/analyzer/ast';
import AstDB from '../../../lib/lang/compiler/ast-debruijn';
import deBruijn from '../../../lib/lang/compiler/debruijn.js'

export default {
    setUp: function (done) {
        done();
    },

    'transform a constant': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.constant(42)),
            AstDB.constant(42),
            'Transform a constant.');
        test.done();
    },

    'transform a native': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.native("add")),
            AstDB.native("add"),
            'Transform a native.');
        test.done();
    },

    'transform a free variable': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.ident('x')),
            AstDB.ident('x'),
            'Transform a free variable.');
        test.done();
    },

    'transform the identity': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.abstraction('x', Ast.ident('x'))),
            AstDB.abstraction(AstDB.variable(0)),
            'Transform the identity.');
        test.done();
    },

    'transform true function (Also Called K)': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.abstraction('x', Ast.abstraction('y', Ast.ident('x')))),
            AstDB.abstraction(AstDB.abstraction(AstDB.variable(1))),
            'Transform true function (Also Called K).');
        test.done();
    },

    'transform false function': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.abstraction('x', Ast.abstraction('y', Ast.ident('y')))),
            AstDB.abstraction(AstDB.abstraction(AstDB.variable(0))),
            'Transform false function.');
        test.done();
    },

    'transform function with hidden variable': function (test) {
        test.expect(1);
        test.deepEqual(
            deBruijn(Ast.abstraction('x', Ast.abstraction('x', Ast.ident('x')))),
            AstDB.abstraction(AstDB.abstraction(AstDB.variable(0))),
            'Transform function with hidden variable.');
        test.done();
    },
}
