import { stream } from 'parser-combinator';
import parser from '../../../lib/lang/analyzer/parser';
import ast from '../../../lib/lang/analyzer/ast';

export default {
    setUp: function(done) {
        done();
    },

    'parse constant definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('def Ultimate 42')).value.array(),
                       [ ast.definition('Ultimate',ast.constant(42)) ],
                       'should accept ultimate definition.');
        test.done();
    },

    'parse Identity definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('def Identity { x -> x }')).value.array(),
                       [ ast.definition('Identity',ast.abstraction('x', ast.ident('x'))) ],
                       'should accept identity definition.');
        test.done();
    },

    'parse main definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('{ x -> x } 42')).value.array(),
                       [ ast.main(ast.application(ast.abstraction('x',ast.ident('x')),ast.constant(42))) ],
                       'should accept identity definition.');
        test.done();
    },

    'parse multiple definitions': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('def Identity { x -> x } Identity 42')).value.array(),
                       [ ast.definition('Identity',ast.abstraction('x', ast.ident('x'))),
                         ast.main(ast.application(ast.ident('Identity'),ast.constant(42))) ],
                       'should accept identity and an application defintions.');
        test.done();
    },
}
