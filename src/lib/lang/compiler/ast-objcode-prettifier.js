/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class AstObjcodePrettifier {

    access(i) {
        return "access(" + i.index + ")"
    }

    closure(i) {
        return "closure([" + i.instructions.map(e => e.visit(this)).join(";") + "])"
    }

    apply() {
        return "apply"
    }

    returns() {
        return "returns"
    }

    constant(m) {
        return "constant(" + m.value + ")";
    }

    ident(i) {
        return "ident(" + i.name + ")";
    }

    native(n) {
        return "native(" + n.name + ")";
    }

    // -------------------------------------------------------------------------

    definition(d) {
        return d.name + " = [" + d.expression.map(e => e.visit(this)).join(";") + "]";
    }

    main(m) {
        return "[" + m.expression.map(e => e.visit(this)).join(";") + "]";
    }

    pretty(c) {
        return c.visit(this);
    }
}

export default (e) => e.visit(new AstObjcodePrettifier());
