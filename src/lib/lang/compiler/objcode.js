/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import Objcode from './ast-objcode';
import '../../extensions/array'

class Generator {

    // -----------------------------------------------------------------------------

    definition(d) {
        return Objcode.definition(d.name, d.expression.visit(this));
    }

    main(m) {
        return Objcode.main(m.expression.visit(this));
    }

    // -----------------------------------------------------------------------------

    ident(i) {
        return [Objcode.ident(i.name)];
    }

    variable(i) {
        return [Objcode.access(i.index)];
    }

    constant(c) {
        return [Objcode.constant(c.value)];
    }

    native(n) {
        return [Objcode.native(n.name)];
    }

    application(a) {
        return a.abstraction.visit(this)
            .concat(a.argument.visit(this))
            .concat(Objcode.apply);
    }

    abstraction(a) {
        return [Objcode.closure(a.body.visit(this).concat(Objcode.returns))];
    }
}

export default (e) => e.visit(new Generator());
