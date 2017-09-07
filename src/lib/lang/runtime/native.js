/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astResult from './ast-result';

// Remember De Bruijn indexes

export default {
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
    'equal': env => {
        const a = env[3].value,
              b = env[2].value,
              t = env[1].value,
              f = env[0].value;

        return a === b ? t : f;
    }
}
