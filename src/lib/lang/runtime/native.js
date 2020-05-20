/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/*global document*/

import AstResult from './ast-result';

function mustBe(v, type) {
    if (typeof v === type) {
        return v;
    } else {
        throw new EvalError("Waiting for " + type + " and not a " + typeof v);
    }
}

// Remember De Bruijn indexes

export default {
    // Dom operations
    'set': env => {
        const node = env[1],
            text = env[0];

        node.value.innerText = text.value;

        return node;
    },
    'get': env => {
        const identifier = mustBe(env[0].value, "string");

        return AstResult.constant(document.getElementById(identifier));
    },
    // Number operations
    'plus': env => {
        const a = env[1].value,
            b = env[0].value;

        return AstResult.constant(a + b);
    },
    'minus': env => {
        const a = mustBe(env[1].value, "number"),
            b = mustBe(env[0].value, "number");

        return AstResult.constant(a - b);
    },
    'mult': env => {
        const a = mustBe(env[1].value, "number"),
            b = mustBe(env[0].value, "number");

        return AstResult.constant(a * b);
    },
    // Predicates
    'equal': env => {
        const a = env[3].value,
            b = env[2].value,
            t = env[1],
            f = env[0];

        return a === b ? t : f;
    },
    'leq': env => {
        const a = env[3].value,
            b = env[2].value,
            t = env[1],
            f = env[0];

        return a <= b ? t : f;
    }
}
