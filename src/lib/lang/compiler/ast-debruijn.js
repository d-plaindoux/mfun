/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import ast from "../analyzer/ast"

class /*abstract*/ DeBruijnExpression {}

class Ident extends DeBruijnExpression {
    // String -> DeBruijnExpression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }
}

class Native extends DeBruijnExpression {
    // String, Number -> DeBruijnExpression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.native(this);
    }
}

class Constant extends DeBruijnExpression {
    // Number|String|Char -> DeBruijnExpression
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }
}

class Application extends DeBruijnExpression {
    // Abstraction, DeBruijnExpression -> DeBruijnExpression
    constructor(abstraction, argument) {
        super();
        this.abstraction = abstraction;
        this.argument = argument;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.application(this);
    }
}

class Abstraction extends DeBruijnExpression {
    // String, DeBruijnExpression -> DeBruijnExpression
    constructor(body) {
        super();
        this.body = body;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.abstraction(this);
    }
}

class Variable extends DeBruijnExpression {
    // String -> DeBruijnExpression
    constructor(index) {
        super();
        this.index = index;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.variable(this);
    }
}

export default {
    ident: n => new Ident(n),
    constant: c => new Constant(c),
    native: (n) => new Native(n),
    application: (f,a) => new Application(f,a),
    abstraction: (b) => new Abstraction(b),
    variable: n => new Variable(n),
    definition: ast.definition,
    main: ast.main
}
