/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {data as Data, Streams} from '@masala/parser';
import Parser from '../../../lib/lang/analyzer/parser';
import ast from '../../../lib/lang/analyzer/ast';

function expression(s) {
    return Parser.expression().parse(Streams.ofString(s));
}

export default {
    setUp: function (done) {
        done();
    },

    'parse unit': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('()').value,
            ast.constant(Data.unit),
            'should accept unit.');
        test.done();
    },

    'parse number': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('42').value,
            ast.constant(42),
            'should accept number.');
        test.done();
    },

    'parse string': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('"42"').value,
            ast.constant('42'),
            'should accept string.');
        test.done();
    },

    'parse native': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('native "+"').value,
            ast.native('+'),
            'should accept native.');
        test.done();
    },

    'parse native not well formed': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('native +').location(),
            7,
            'should accept native.');
        test.done();
    },

    'parse ident': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("anIdent").value,
            ast.ident('anIdent'),
            'should accept ident.');
        test.done();
    },

    'parse identity abstraction': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("{ a -> a }").value,
            ast.abstraction('a', ast.ident('a')),
            'should accept abstraction.');
        test.done();
    },

    'parse identity abstraction with implicit parameter': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("{ _ }").value,
            ast.abstraction('_', ast.ident('_')),
            'should accept abstraction.');
        test.done();
    },

    'parse true abstraction': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("{ a b -> a }").value,
            ast.abstraction('a', ast.abstraction('b', ast.ident('a'))),
            'should accept abstraction.');
        test.done();
    },

    'parse simple application': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("a b").value,
            ast.application(ast.ident('a'), ast.ident('b')),
            'should accept application.');
        test.done();
    },

    'parse simple left associativity': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("a b c").value,
            ast.application(ast.application(ast.ident('a'), ast.ident('b')), ast.ident('c')),
            'should accept application.');
        test.done();
    },

    'parse simple right associativity': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("a (b c)").value,
            ast.application(ast.ident('a'), ast.application(ast.ident('b'), ast.ident('c'))),
            'should accept application.');
        test.done();
    },

    'parse simple right associativity using $': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("a $ b c").value,
            ast.application(ast.ident('a'), ast.application(ast.ident('b'), ast.ident('c'))),
            'should accept application.');
        test.done();
    },

    'parse number in block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('(42)').value,
            ast.constant(42),
            'should accept number.');
        test.done();
    },

    'parse string in block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('("42")').value,
            ast.constant('42'),
            'should accept string.');
        test.done();
    },

    'parse native in a block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression('(native "+")').value,
            ast.native('+'),
            'should accept native in a block.');
        test.done();
    },

    'parse ident in a block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("(anIdent)").value,
            ast.ident('anIdent'),
            'should accept ident in a block.');
        test.done();
    },

    'parse identity abstraction in a block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("({ a -> a })").value,
            ast.abstraction('a', ast.ident('a')),
            'should accept abstraction in a block.');
        test.done();
    },

    'parse true abstraction in a block': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("({ a b -> a })").value,
            ast.abstraction('a', ast.abstraction('b', ast.ident('a'))),
            'should accept abstraction in a block.');
        test.done();
    },

    'parse let binding': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("let a = b in c").value,
            ast.application(ast.abstraction('a', ast.ident('c')), ast.ident('b')),
            'should accept abstraction in a block.');
        test.done();
    },

    'parse let binding not well formed': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("let a = in c").isAccepted(),
            false,
            'should accept abstraction in a block.');
        test.done();
    },

    'parse let binding not well formed and provide the error location': function (test) {
        test.expect(1);
        test.deepEqual(
            expression("let a = in c").location(),
            8,
            'should accept abstraction in a block.');
        test.done();
    },
}
