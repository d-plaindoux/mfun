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
        return null;
    }

    constant(c) {
        return null;
    }

    native(n) {
        return null;
    }

    application(a) {
        return null;
    }

    abstraction(a) {
        return null;
    }
}

export default function(e) {
    return e.visit(new Transformer([]));
}
