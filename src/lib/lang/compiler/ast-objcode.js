/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astDB from "./ast-debruijn"

/*abstract*/ class Objcode {
}

class Access extends Objcode {

    constructor(index) {
        super();
        this.index = index;
    }

    visit(visitor) {
        return visitor.access(this);
    }

}

class Closure extends Objcode {

    constructor(instructions) {
        super();
        this.instructions = instructions;
    }

    visit(visitor) {
        return visitor.closure(this);
    }

}

class Returns extends Objcode {

    visit(visitor) {
        return visitor.returns();
    }

}

class Apply extends Objcode {

    visit(visitor) {
        return visitor.apply();
    }

}

// Extra instructions

class Constant extends Objcode {

    // Number|String|Char -> Objcode
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }

}

class Ident extends Objcode {

    // Number -> Objcode
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }

}

class Native extends Objcode {
    // String, Number -> Objcode
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.native(this);
    }

}

export default {
    access: (i) => new Access(i),
    closure: (i) => new Closure(i),
    returns: new Returns(),
    apply: new Apply(),
    ident: (c) => new Ident(c),
    constant: (c) => new Constant(c),
    native: (n) => new Native(n),
    definition: astDB.definition,
    main: astDB.main
}
