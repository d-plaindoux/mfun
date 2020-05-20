/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class Printer {

    constructor() {
    }

    constant(c) {
        console.log(c.value);
    }

    closure(c) {
        console.log("<function>");
    }

    apply(c) {
        c.visit(this);
    }

}

// Factory :: unit -> Printer
export default () => new Printer();
