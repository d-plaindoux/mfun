/*
 * mfun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {data as Data, C as Char, F as Flow, N as Number} from '@masala/parser';
import Ast from './ast';
import '../../extensions/array'

// unit -> Parser Expression string
const
    keywords = ['def', 'let', 'in'],
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
function letBlock() {
    return atom('let')
        .then(identifier)
        .then(atom('='))
        .then(Flow.lazy(expression))
        .then(atom('in'))
        .then(Flow.lazy(expression))
        .map(t => Ast.application(Ast.abstraction(t.at(0), t.at(2)), t.at(1)));
}

// unit -> Parser Expression string
function block() {
    return atom('(')
        .then(Flow.lazy(expression).opt())
        .then(atom(')'))
        .single()
        .map(t => t.orElse(Ast.constant(Data.unit)));
}

// unit -> Parser Expression string
function infixBlock() {
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
    return abstraction()
        .or(letBlock())
        .or(block())
        .or(infixBlock())
        .or(native())
        .or(terminal());
}

// unit -> Parser Expression string
function expression() {
    return simpleExpression().flatMap(first =>
        simpleExpression().optrep()
            .map(others => {
                return others.array().foldLeft(first, Ast.application)
            })
    );
}

// unit -> Parser Entity string
function definitionOrMain() {
    return atom('def').then(identifier).then(atom('=')).then(expression())
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
    return definitionOrMain().optrep();
}

export default {
    expression,
    entities
};
