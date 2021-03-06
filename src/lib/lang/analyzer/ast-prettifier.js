/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class AstPrettifier {

    constructor() {
    }

    // -----------------------------------------------------------------------------

    definition(d) {
        return d.name + " = " + d.expression.visit(this);
    }

    main(m) {
        return m.expression.visit(this);
    }

    // -----------------------------------------------------------------------------

    ident(i) {
        return "ident(" + i.name + ")";
    }

    constant(c) {
        return "constant(" + c.value + ")";
    }

    native(n) {
        return "native(" + n.name + ")";
    }

    application(a) {
        return a.abstraction.visit(this) + " (" + a.argument.visit(this) + ")";
    }

    abstraction(a) {
        return "{ " + a.variable + " -> " + a.body.visit(this) + "}";
    }
}

export default (e) => e.visit(new AstPrettifier());
