/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/*global document*/

export default () => {
    const scripts = Array.prototype.slice.call(document.getElementsByTagName("script"));
    var sourceCode = "";

    scripts.forEach(script => {
        if (script.getAttribute("type") === "application/mfun") {
            sourceCode += script.innerHTML + "\n";
        }
    });

    return sourceCode;
}
