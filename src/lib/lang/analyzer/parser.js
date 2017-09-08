/*
 * fun.js
 * https://github.com/d-plaindoux/mfun
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

// Parser a' Token -> Parser a' char
function analyzer(parser) {
    return GLex.genlex
          .generator(['def', 'native', '{', '}' , '->', '(', ')', '$' ])
          .tokenBetweenSpaces(GLex.token.builder)
          .chain(parser.then(Flow.eos.drop()))
          .parse;
}

// unit -> Parser Expression Token
function atom() {
    return Flow.error; // TODO ::= Number | String | Ident
}


// unit -> Parser Expression Token
function abstraction() {
    return Flow.error; // TODO ::= '{' (IDENT+ '->')? expression '}'
}

// unit -> Parser Expression Tokenﬂ
function native() {
    return Flow.error; // TODO ::= 'native' IDENT
}

// unit -> Parser Expression Token
function block() {
    return Flow.error; // TODO ::= '(' expression? ')'
}

// unit -> Parser Expression Token
function endBlock() {
    return Flow.error; // TODO ::= '$' expression
}

// unit -> Parser Expression Token
function simpleExpression() {
    return Flow.error; // TODO ::= abstraction | block | endBlock | atom | natives
}

// unit -> Parser Expression Token
function expression() {
    return Flow.error; // TODO ::= simpleExpression simpleExpression*
}

// unit -> Parser Entity Token
function definition() {
    // ::= 'def' IDENT simpleExpression
    return tkKeyword('def').then(tkIdent).then(simpleExpression())
        .map(t => ast.definition(t[0], t[1]));
}

// unit -> Parser Entity Token
function main() {
    // ::= expression
    return expression().map(ast.main);
}

// unit -> Parser [Entity] Token
function entities() {
    return definition().or(main()).optrep();
}

export default {
    atom: analyzer(atom()),
    abstraction: analyzer(abstraction()),
    native: analyzer(native()),
    block: analyzer(block()),
    endBlock: analyzer(endBlock()),
    simpleExpression: analyzer(simpleExpression()),
    expression: analyzer(expression()),
    entities: analyzer(entities())
};
