/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class Fun {

    constructor(document) {
        this.document = document
        this.applicationMfun = "application/mfun";
    }

    execute(evaluation) {
        this.sources().map(evaluation);
    }

    sources() {
        return Array.prototype.slice.call(this.document.getElementsByTagName("script"))
            .filter(s => s.getAttribute("type") === this.applicationMfun)
            .map(s => s.innerHTML);
    }
}

export default (document) => new Fun(document)


