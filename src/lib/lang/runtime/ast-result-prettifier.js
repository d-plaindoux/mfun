/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class AstResultPrettifier {

    constructor() {
    }

    constant(c) {
        return c.value
    }

    closure(c) {
        return "<function>"
    }

    definition(c) {
        return c.name
    }

    main(c) {
        return "_"
    }
}

// Factory :: unit -> ToString
export default (e) => e.visit(new AstResultPrettifier());
