/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import evaluatorFactory from './evaluator'
import printerFactory from './printer'

const evaluator = evaluatorFactory();
const printer = printerFactory();

export default sourceCode => {
    evaluator.apply(sourceCode)
        .onSuccess(rs => rs.forEach(r => printer.apply(r)))
        .onFailure(r => console.log(r));
}
