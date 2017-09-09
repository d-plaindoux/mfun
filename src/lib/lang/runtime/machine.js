/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { data } from 'parser-combinator';
import native from "./native";
import astResult from "./ast-result";

class EnsureClosure {

    constant(c) {
        throw new EvalError("Waiting for a closure")
    }

    closure(c) {
        return c;
    }

}

class Machine {

    constructor() {
        this.ensureClosure = new EnsureClosure();
        this.definitions = {};
        this.init([]);
    }

    init(code) {
        this.code = code;
        this.env = [];
        this.stack = [];
    }

    // :: [Objcode] -> Try EvaluatedCode
    execute(code) {
        this.init(code)

        while (this.code.length > 0) {
            try {
                this.code.shift().visit(this);
            } catch (e) {
                return data.atry.failure(e);
            }
        }

        return data.atry.success(this.stack.shift());
    }

    access(i) {
    }

    closure(i) {
    }

    apply() {
    }

    returns() {
    }

    constant(m) {
    }

    ident(i) {
    }

    native(n) {
    }

    // -------------------------------------------------------------------------

    definition(d) {
        return this.execute(d.expression).onSuccess(r => this.definitions[d.name] = r);
    }

    main(m) {
        return this.execute(m.expression);
    }

    // :: Entity Objcode -> Try EvaluatedCode
    eval(e) {
        return e.visit(this);
    }
}


// Factory :: unit -> Machine
export default () => new Machine();
