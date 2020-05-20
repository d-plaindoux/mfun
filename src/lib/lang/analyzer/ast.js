/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

// -----------------------------------------------------------------------------
// Entity definition
// -----------------------------------------------------------------------------

/*abstract*/
class Entity {
}

class Definition extends Entity {
    // String -> Expression
    constructor(name, expression) {
        super();
        this.name = name;
        this.expression = expression;
    }

    // Visitor 'b -> 'b
    visit(visitor) {
        return visitor.definition(this);
    }
}

class Main extends Entity {
    // String -> Expression
    constructor(expression) {
        super();
        this.expression = expression;
    }

    // Visitor 'b -> 'b
    visit(visitor) {
        return visitor.main(this);
    }
}

// -----------------------------------------------------------------------------

/*abstract*/
class Expression {
}

class Ident extends Expression {
    // String -> Expression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }
}

class Native extends Expression {
    // String, Number -> Expression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.native(this);
    }
}

class Constant extends Expression {
    // Number|String|Char -> Expression
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }
}

class Application extends Expression {
    // Abstraction, Expression -> Expression
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

class Abstraction extends Expression {
    // String, Expression -> Expression
    constructor(variable, body) {
        super();
        this.variable = variable;
        this.body = body;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.abstraction(this);
    }
}

export default {
    ident: n => new Ident(n),
    constant: c => new Constant(c),
    native: (n) => new Native(n),
    application: (f, a) => new Application(f, a),
    abstraction: (v, b) => new Abstraction(v, b),
    definition: (n, e) => new Definition(n, e),
    main: e => new Main(e)
}
