/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class Printer {

    constructor() {
        this.machine = machineFactory();
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
