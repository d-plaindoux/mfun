/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astResult from './ast-result';

// Remember De Bruijn indexes

export default {
    // Number operations
    'add': env => {
        const a = env[1].value,
              b = env[0].value;

        return astResult.constant(a + b);
    },
    'minus': env => {
        const a = env[1].value,
              b = env[0].value;

        return astResult.constant(a - b);
    },
    'mult': env => {
        const a = env[1].value,
              b = env[0].value;

        return astResult.constant(a * b);
    },
    // Predicates
    'equal': env => {
        const a = env[3].value,
            b = env[2].value,
            t = env[1].value,
            f = env[0].value;

        return a === b ? t : f;
    },
    'leq': env => {
        const a = env[3].value,
              b = env[2].value,
              t = env[1].value,
              f = env[0].value;

        return a <= b ? t : f;
    }
}
