/*
 * mfun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {C as Char, data, F as Flow, N as Number} from '@masala/parser';
import ast from './ast';
import '../../extensions/array'

const
    skip = Char.charIn(' \t\n\r\f').optrep().drop(),
    numberLiteral = skip.then(Number.number()).then(skip).single(),
    stringLiteral = skip.then(Char.stringLiteral()).then(skip).single(),
    identifier = skip.then(Char.letters().or(Char.char('_'))).then(skip).single(),
    atom = (s) => skip.then(Char.string(s)).then(skip).drop();

// unit -> Parser Expression Token
function abstraction() {
    return atom('{')
        .then(Flow.try(identifier.rep().then(atom('->'))).opt())
        .then(Flow.lazy(expression))
        .then(atom('}'))
        .map(t =>
            t.at(0)
                .map(p => p.array()).orElse(['_'])
                .foldRight(ast.abstraction, t.at(1))
        );
}

// unit -> Parser Expression Token
function block() {
    return atom('(')
        .then(Flow.lazy(expression).opt())
        .then(atom(')'))
        .single()
        .map(t => t.orElse(ast.constant(data.unit)));
}

// unit -> Parser Expression Token
function endBlock() {
    return atom('$').then(Flow.lazy(expression)).single();
}

// unit -> Parser Expression Token
function native() {
    return atom('native').then(stringLiteral).single().map(ast.native);
}

// unit -> Parser Expression Token
function terminal() {
    return identifier.map(ast.ident)
        .or(numberLiteral.map(ast.constant))
        .or(stringLiteral.map(ast.constant));
}

// unit -> Parser Expression Token
function simpleExpression() {
    return abstraction().or(block()).or(endBlock()).or(native()).or(terminal());
}

// unit -> Parser Expression Token
function expression() {
    return simpleExpression().flatMap(f =>
        simpleExpression().optrep()
            .map(t => {
                return t.array().foldLeft(f, ast.application)
            })
    );
}

// unit -> Parser Entity Token
function definition() {
    return atom('def').then(identifier).then(simpleExpression())
        .map(t => ast.definition(t.at(0), t.at(1)));
}

// unit -> Parser Entity Token
function main() {
    return expression().map(ast.main);
}

// unit -> Parser [Entity] Token
function entities() {
    return definition().or(main()).optrep();
}

export default {
    expression,
    entities
};
