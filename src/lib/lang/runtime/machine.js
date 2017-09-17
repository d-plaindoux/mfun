/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {data} from 'parser-combinator';
import native from "./native";
import astResult from "./ast-result";

class GetClosure {

    constant(c) {
        throw new EvalError("Waiting for a closure")
    }

    closure(c) {
        return c;
    }

}

class Machine {

    constructor() {
        this.getClosure = new GetClosure();
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
        this.stack.unshift(this.env[i.index - 1]);
    }

    closure(i) {
        this.stack.unshift(astResult.closure(i.instructions, this.env.slice()));
    }

    apply() {
        const v = this.stack.shift(),
            c = this.stack.shift().visit(this.getClosure);

        this.stack.unshift(this.env);
        this.stack.unshift(this.code);

        this.code = c.code.slice();
        this.env = c.env.slice();

        this.env.unshift(v);
    }

    returns() {
        const v = this.stack.shift(),
            c = this.stack.shift(),
            e = this.stack.shift();

        this.code = c.slice();
        this.env = e.slice();

        this.stack.unshift(v);
    }

    constant(m) {
        this.stack.unshift(astResult.constant(m.value));
    }

    ident(i) {
        const definition = this.definitions[i.name];

        if (definition === null) {
            throw new EvalError("Undefined definition symbol " + i.name);
        }

        this.stack.unshift(definition);
    }

    native(n) {
        const funcall = native[n.name];

        if (funcall === null) {
            throw new EvalError("Undefined native symbol " + n.name);
        }

        this.stack.unshift(funcall(this.env.slice()));
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
