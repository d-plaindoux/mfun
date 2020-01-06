/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {Streams, data} from '@masala/parser';
import parser from "../analyzer/parser";
import deBruijn from "../compiler/debruijn";
import objectCode from "../compiler/objcode";
import machineFactory from "../runtime/machine";

import "../../extensions/array"

class Eval {

    constructor() {
        this.machine = machineFactory();
    }

    // :: [Entity Objcode] -> Try [EvaluatedCode]
    evalAtMost(a) {
        return a.foldLeft(
            data.atry.success([]),
            (l, c) => l.flatMap(l => this.machine.evaluate(c).map(c => l.concat([c])))   // List comprehension like
            // TODO - check this code
        );
    }

    // :: String -> Try [Objcode]
    apply(source) {
        return parser.entities().parse(Streams.ofString(source))                    // Response (List Entity)
            .toTry()                                                                // Try (List (Entity Expression))
            .map(l => l.array())                                                    // Try [Entity Expression]
            .map(a => a.map(deBruijn))                                            // Try [Entity DeBruijnExpression]
            .map(a => a.map(objectCode))                                             // Try [Entity Objcode]
            .flatMap(this.evalAtMost.bind(this));                                   // Try [EvaluatedCode]
    }

}

// Factory :: unit -> Eval
export default () => new Eval();
