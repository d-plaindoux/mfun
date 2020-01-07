/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import AstDB from './ast-debruijn';

class Transformer {

    constructor(variables) {
        this.variables = variables;
    }

    // -----------------------------------------------------------------------------

    definition(d) {
        return AstDB.definition(d.name, d.expression.visit(this));
    }

    main(m) {
        return AstDB.main(m.expression.visit(this));
    }

    // -----------------------------------------------------------------------------

    ident(i) {
        const index = this.variables.indexOf(i.name);

        if (index === -1) {
            return AstDB.ident(i.name);
        } else {
            return AstDB.variable(index);
        }
    }

    constant(c) {
        return AstDB.constant(c.value);
    }

    native(n) {
        return AstDB.native(n.name);
    }

    application(a) {
        return AstDB.application(a.abstraction.visit(this), a.argument.visit(this));
    }

    abstraction(a) {
        const newVariables = [a.variable].concat(this.variables),
            newTransformer = new Transformer(newVariables);

        return AstDB.abstraction(a.body.visit(newTransformer));
    }
}

export default (e) => e.visit(new Transformer([]));
