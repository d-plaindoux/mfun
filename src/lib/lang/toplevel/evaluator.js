/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2018-2020 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import {Streams, data} from '@masala/parser';
import parser from "../analyzer/parser";
import deBruijn from "../compiler/debruijn";
import objectCode from "../compiler/objcode";
import machine from "../runtime/machine";

import "../../extensions/array"

class Eval {

    constructor() {
        this.machine = machine();
    }

    // Objcode -> Try [EvaluatedCode]
    execute(c) {
        return this.machine.evaluate(c)
    }

    // :: string -> Try [Entity Expression]
    parse(source) {
        return parser.entities().parse(Streams.ofString(source))                    // Response (List Entity)
            .toTry()                                                                // Try (List (Entity Expression))
            .map(l => l.array())                                                    // Try [Entity Expression]
    }

    // :: Entity Expression -> Entity Objcode
    objectCode(a) {
        return objectCode(a)
    }

    deBruijn(a) {
        return deBruijn(a)
    }

    compile(a) {
        return this.objectCode(this.deBruijn(a))
    }

    // :: [Entity Objcode] -> Try [EvaluatedCode]
    evalAtMost(a) {
        return a.foldLeft(
            data.atry.success([]),
            (r, c) => r.flatMap(l =>
                this.execute(c).map(c => l.concat([c]))
            )
        );
    }

    // :: string -> Try [EvaluatedCode]
    apply(source) {
        return this.parse(source)                                                   // Try (List (Entity Expression))
            .map(a => a.map(this.compile.bind(this)))                               // Try [Entity DeBruijnExpression]
            .flatMap(this.evalAtMost.bind(this));                                   // Try [EvaluatedCode]
    }
}

// Factory :: unit -> Eval
export default () => new Eval();
