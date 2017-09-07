/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

Array.prototype.foldLeft = function(initial,funcall) {
    var i, result = initial;
    for(i = 0; i < this.length; i++) {
        result = funcall(result, this[i]);
    }
    return result;
};

Array.prototype.foldRight = function(funcall,initial) {
    var i, result = initial;
    for(i = this.length; i > 0; i--) {
        result = funcall(this[i-1], result);
    }
    return result;
};
