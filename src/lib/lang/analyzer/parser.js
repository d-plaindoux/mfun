/*
 * mfun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {C as Char, data as Data, F as Flow, N as Number} from '@masala/parser';
import Ast from './ast';
import '../../extensions/array'

// unit -> Parser Expression string
const
    keywords = ['let', 'in', 'native'],
    ident = Char.letter().or(Char.char('_'))
        .then(Char.letter().or(Number.digit()).or(Char.charIn('_$?')).optrep())
        .map(s => s.array().join(''))
        .filter(s => keywords.indexOf(s) === -1);

const
    skip = Char.charIn(' \t\n\r\f').optrep().drop(),
    numberLiteral = skip.then(Number.number()).then(skip).single(),
    stringLiteral = skip.then(Char.stringLiteral()).then(skip).single(),
    identifier = skip.then(ident).then(skip).single(),
    atom = (s) => skip.then(Char.string(s)).then(skip).drop();

// unit -> Parser Expression string
function terminal() {
    return identifier.map(Ast.ident)
        .or(numberLiteral.map(Ast.constant))
        .or(stringLiteral.map(Ast.constant));
}

// unit -> Parser Expression string
function native() {
    return atom('native').then(stringLiteral).single().map(Ast.native);
}

// unit -> Parser Expression string
function block() {
    return atom('(')
        .then(Flow.lazy(expressions).opt())
        .then(atom(')'))
        .single()
        .map(t => t.orElse(Ast.constant(Data.unit)));
}

// unit -> Parser Expression string
function infixBlock() {
    return atom('$').then(Flow.lazy(expressions)).single();
}

// unit -> Parser Expression string
function abstraction() {
    return atom('{')
        .then(Flow.try(identifier.rep().then(atom('->'))).opt())
        .then(Flow.lazy(expressions))
        .then(atom('}'))
        .map(t =>
            t.at(0)
                .map(p => p.array()).orElse(['_'])
                .foldRight(Ast.abstraction, t.at(1))
        );
}

// unit -> Parser Expression string
function letBlock() {
    return atom('let')
        .then(identifier)
        .then(atom('='))
        .then(Flow.lazy(expressions))
        .then(atom('in'))
        .then(Flow.lazy(expressions))
        .map(t => Ast.application(Ast.abstraction(t.at(0), t.at(2)), t.at(1)))
}

// unit -> Parser Expression string
function expressions() {
    const expression = abstraction().or(block()).or(infixBlock()).or(native()).or(terminal()).or(letBlock());

    return expression.flatMap(first =>
        expression.optrep()
            .map(others => {
                return others.array().foldLeft(first, Ast.application)
            })
    );
}

// unit -> Parser Entity string
function definitionOrMain() {
    return atom('let').then(identifier).then(atom('=')).then(expressions())
        .map(t => {
            if (t.at(0) === '_') {
                return Ast.main(t.at(1));
            } else {
                return Ast.definition(t.at(0), t.at(1));
            }
        });
}

// unit -> Parser [Entity] string
function entities() {
    return definitionOrMain().optrep().then(Flow.eos().drop());
}

export default {
    expression: expressions,
    entities: entities
};
