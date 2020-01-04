/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astObjcode from '../../../lib/lang/compiler/ast-objcode';
import astResult from '../../../lib/lang/runtime/ast-result';
import engineFactory from '../../../lib/lang/toplevel/evaluator'

function destruct(r) {
    return r.onFailure(e => { throw e; }).success();
}

export default {
    setUp: function(done) {
        done();
    },


}
