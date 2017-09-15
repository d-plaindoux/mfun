/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import evaluator from './evaluator'
import printer from './printer'

export default reader => {
    evaluator().apply(reader())
        .onSuccess(rs => rs.forEach(r => printer().apply(r)))
        .onFailure(r => console.log(r));
}
