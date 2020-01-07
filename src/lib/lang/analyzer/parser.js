/*
 * mfun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {C as Char, data, F as Flow, N as Number} from '@masala/parser';
import Ast from './ast';
import '../../extensions/array'

const
    skip = Char.charIn(' \t\n\r\f').optrep().drop(),
    numberLiteral = skip.then(Number.number()).then(skip).single(),
    stringLiteral = skip.then(Char.stringLiteral()).then(skip).single(),
    identifier = skip.then(Char.letters().or(Char.char('_'))).then(skip).single(),
    atom = (s) => skip.then(Char.string(s)).then(skip).drop();

// unit -> Parser Expression string
function abstraction() {
    return atom('{')
        .then(Flow.try(identifier.rep().then(atom('->'))).opt())
        .then(Flow.lazy(expression))
        .then(atom('}'))
        .map(t =>
            t.at(0)
                .map(p => p.array()).orElse(['_'])
                .foldRight(Ast.abstraction, t.at(1))
        );
}

// unit -> Parser Expression string
function block() {
    return atom('(')
        .then(Flow.lazy(expression).opt())
        .then(atom(')'))
        .single()
        .map(t => t.orElse(Ast.constant(data.unit)));
}

// unit -> Parser Expression string
function endBlock() {
    return atom('$').then(Flow.lazy(expression)).single();
}

// unit -> Parser Expression string
function native() {
    return atom('native').then(stringLiteral).single().map(Ast.native);
}

// unit -> Parser Expression string
function terminal() {
    return identifier.map(Ast.ident)
        .or(numberLiteral.map(Ast.constant))
        .or(stringLiteral.map(Ast.constant));
}

// unit -> Parser Expression string
function simpleExpression() {
    return abstraction().or(block()).or(endBlock()).or(native()).or(terminal());
}

// unit -> Parser Expression string
function expression() {
    return simpleExpression().flatMap(f =>
        simpleExpression().optrep()
            .map(t => {
                return t.array().foldLeft(f, Ast.application)
            })
    );
}

// unit -> Parser Entity string
function definition() {
    return atom('def').then(identifier).then(simpleExpression())
        .map(t => Ast.definition(t.at(0), t.at(1)));
}

// unit -> Parser Entity string
function main() {
    return expression().map(Ast.main);
}

// unit -> Parser [Entity] string
function entities() {
    return definition().or(main()).optrep();
}

export default {
    expression,
    entities
};
