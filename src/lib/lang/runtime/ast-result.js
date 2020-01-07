/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/*abstract*/
class Result {
}

class Constant extends Result {

    // Number|String|Char|unit -> ResultCode
    constructor(value) {
        super();
        this.value = value;
    }

    visit(visitor) {
        return visitor.constant(this);
    }

}

class Closure extends Result {

    constructor(code, env) {
        super();
        this.code = code;
        this.env = env;
    }

    visit(visitor) {
        return visitor.closure(this);
    }

}

export default {
    closure: (c, e) => new Closure(c, e),
    constant: (v) => new Constant(v)
}
