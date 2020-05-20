/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

export default evaluator => toString => sourceCode => {
    evaluator.apply(sourceCode)
        .onSuccess(results =>
            results.map(r => toString.apply(r))
                .forEach(r => console.log(r))
        )
        .onFailure(r => console.log(r));
}
