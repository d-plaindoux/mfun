/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import repl from './lang/toplevel/repl';
import browserReader from './reader/browser';

export default {
    repl,
    reader: {
        browser: browserReader
    }
}

