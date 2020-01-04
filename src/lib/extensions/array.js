/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

Array.prototype.foldLeft = function (initial, funcall) {
    let i, result = initial;
    for (i = 0; i < this.length; i++) {
        result = funcall(result, this[i]);
    }
    return result;
};

Array.prototype.foldRight = function (funcall, initial) {
    let i, result = initial;
    for (i = this.length; i > 0; i--) {
        result = funcall(this[i - 1], result);
    }
    return result;
};
