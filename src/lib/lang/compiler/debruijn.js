/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astDB from './ast-debruijn';

class Transformer {

    constructor(variables) {
        this.variables = variables;
    }

    definition(d) {
        return astDB.definition(d.name, d.expression.visit(this));
    }

    main(m) {
        return astDB.main(m.expression.visit(this));
    }

    ident(i) {
        const index = this.variables.indexOf(i.name);

        if (index == -1) {
            return astDB.ident(i.name);
        }

        return astDB.variable(index + 1);
    }

    constant(c) {
        return astDB.constant(c.value);
    }

    native(n) {
        return astDB.native(n.name);
    }

    application(a) {
        return astDB.application(a.abstraction.visit(this), a.argument.visit(this));
    }

    abstraction(a) {
        const newVariables = [a.variable].concat(this.variables),
              newTransformer = new Transformer(newVariables);

        return astDB.abstraction(a.body.visit(newTransformer));
    }
}

export default function(e) {
    return e.visit(new Transformer([]));
}
