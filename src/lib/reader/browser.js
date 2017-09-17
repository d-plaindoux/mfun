/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/*global document*/

export default (evalPrint) => {
    Array.prototype.slice.call(document.getElementsByTagName("script"))
        .filter(script => script.getAttribute("type") === "application/mfun")
        .map(script => evalPrint(script.innerHTML));
}
