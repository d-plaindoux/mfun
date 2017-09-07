/*
 * fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import parserExpressionsTest  from './lang/analyzer/parser_expressions_test'
import parserEntitiesTest     from './lang/analyzer/parser_entities_test'
import deBruijnExpressionTest from './lang/compiler/debruijn_expression_test'
import objcodeExpressionTest  from './lang/compiler/objcode_expression_test'
import machineTest            from './lang/runtime/machine_test'

export {
    parserExpressionsTest,
    parserEntitiesTest,
    deBruijnExpressionTest,
    objcodeExpressionTest,
    machineTest
}
