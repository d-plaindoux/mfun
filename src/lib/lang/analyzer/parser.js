/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { genlex as GLex, F as Flow, data } from 'parser-combinator';
import ast from './ast';
import '../../extensions/array'

// Facilities provided by the generic lexer library
const tkNumber  = GLex.token.parser.number,
      tkString  = GLex.token.parser.string,
      tkIdent   = GLex.token.parser.ident,
      tkKeyword = s => GLex.token.parser.keyword.match(s).drop();

// unit -> Parser Expression Token
function atom() {
    return (tkIdent.map(ast.ident))
        .or(tkNumber.map(ast.constant))
        .or(tkString.map(ast.constant));
}

// unit -> Parser Expression Token
function abstraction() {
    return tkKeyword('{')
        .then(tkIdent.rep().then(tkKeyword('->')).opt().map(t => t.orElse(['_'])))
        .then(Flow.lazy(expression))
        .then(tkKeyword('}'))
        .map(t => t[0].array().foldRight(ast.abstraction, t[1]));
}

// unit -> Parser Expression Token
function native() {
    return tkKeyword('native').then(tkString.map(ast.native));
}

// unit -> Parser Expression Token
function block() {
    return tkKeyword('(')
        .then(Flow.lazy(expression).opt().map(t => t.orElse(ast.constant(data.unit))))
        .then(tkKeyword(')'));
}

// unit -> Parser Expression Token
function endBlock() {
    return tkKeyword('$').then(Flow.lazy(expression));
}

// unit -> Parser Expression Token
function simpleExpression() {
    return abstraction().or(block()).or(endBlock()).or(atom()).or(native());
}

// unit -> Parser Expression Token
function expression() {
    return simpleExpression().then(simpleExpression().optrep())
        .map(t => t[1].array().foldLeft(t[0], ast.application));
}

// unit -> Parser Entity Token
function definition() {
    return tkKeyword('def').then(tkIdent).then(simpleExpression())
        .map(t => ast.definition(t[0], t[1]));
}

// unit -> Parser Entity Token
function main() {
    return expression().map(ast.main);
}

// unit -> Parser [Entity] Token
function entities() {
    return definition().or(main()).optrep();
}

// Parser a' Token -> Parser a' char
function analyzer(parser) {
    return GLex.genlex
            .generator(['def', 'native', '{', '}' , '->', '(', ')', '$' ])
            .tokenBetweenSpaces(GLex.token.builder)
            .chain(parser.then(Flow.eos.drop()))
            .parse;
}

export default {
    expression: analyzer(expression()),
    entities: analyzer(entities())
};
