/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astPrettifier from './lang/analyzer/ast-prettifier'
import astDBPrettifier from './lang/compiler/ast-debruijn-prettifier'
import objCodePrettifier from './lang/compiler/ast-objcode-prettifier'
import resultPrettifier from './lang/runtime/ast-result-prettifier'

import eval_print from './lang/toplevel/eval_print';
import evaluatorFactory from "./lang/toplevel/evaluator";
import browser from './reader/browser';

const evaluator = evaluatorFactory()
const toString = resultPrettifier

export default {
    runtime: {
        evaluator: evaluator,
        toString: toString,
        eval_print: eval_print(evaluator)(toString)
    },
    prettifier: {
        ast: astPrettifier,
        astDB: astDBPrettifier,
        object: objCodePrettifier,
        result: resultPrettifier
    },
    reader: {browser}
}

