/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import eval_print from './lang/toplevel/eval_print';
import browserReader from './reader/browser';

export default {
    eval_print,
    reader: {
        browser: browserReader
    }
}

