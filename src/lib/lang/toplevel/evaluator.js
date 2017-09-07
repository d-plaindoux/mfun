/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { stream, data} from 'parser-combinator';
import parser from "../analyzer/parser";
import toDeBruijn from "../compiler/debruijn";
import toObjcode from "../compiler/objcode";
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
            (l,c) => l.flatmap(l => this.machine.eval(c).map(c => l.concat([c])))   // List comprehension like
        );
    }

    // :: String -> Try [Objcode]
    apply(source) {
        return parser.entities(stream.ofString(source))                             // Response (List Entity)
            .toTry()                                                                // Try (List (Entity Expression))
            .map(l => l.array())                                                    // Try [Entity Expression]
            .map(a => a.map(toDeBruijn))                                            // Try [Entity DeBruijnExpression]
            .map(a => a.map(toObjcode))                                             // Try [Entity Objcode]
            .flatmap(this.evalAtMost.bind(this));                                   // Try [EvaluatedCode]
    }

}

// Factory :: unit -> Eval
export default () => new Eval();
