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
        return [ astObjcode.ident(i.name) ];
    }

    variable(i) {
        return [ astObjcode.access(i.index) ];
    }

    constant(c) {
        return [ astObjcode.constant(c.value) ];
    }

    native(n) {
        return [ astObjcode.native(n.name) ];
    }

    application(a) {
        return a.abstraction.visit(this)
            .concat(a.argument.visit(this))
            .concat(astObjcode.apply);
    }

    abstraction(a) {
        return [ astObjcode.closure(a.body.visit(this).concat(astObjcode.returns)) ];
    }
}

export default function(e) {
    return e.visit(new Generator([]));
}
