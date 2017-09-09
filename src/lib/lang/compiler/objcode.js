/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astObjcode from './ast-objcode';
import '../../extensions/array'

class Generator {

    constructor(variables) {
        this.variables = variables;
    }

    definition(d) {
        return astObjcode.definition(d.name, d.expression.visit(this));
    }

    main(m) {
        return astObjcode.main(m.expression.visit(this));
    }

    ident(i) {
        return [ ];
    }

    variable(i) {
        return [ ];
    }

    constant(c) {
        return [ ];
    }

    native(n) {
        return [ ];
    }

    application(a) {
        return [ ];
    }

    abstraction(a) {
        return [ ];
    }
}

export default function(e) {
    return e.visit(new Generator([]));
}
