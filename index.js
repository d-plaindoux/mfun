(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

Array.prototype.foldLeft = function (initial, funcall) {
    var i,
        result = initial;
    for (i = 0; i < this.length; i++) {
        result = funcall(result, this[i]);
    }
    return result;
};

Array.prototype.foldRight = function (funcall, initial) {
    var i,
        result = initial;
    for (i = this.length; i > 0; i--) {
        result = funcall(this[i - 1], result);
    }
    return result;
};
//# sourceMappingURL=array.js.map
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _repl = require('./lang/toplevel/repl');

var _repl2 = _interopRequireDefault(_repl);

var _browser = require('./reader/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

exports.default = {
    repl: _repl2.default,
    reader: {
        browser: _browser2.default
    }
};
//# sourceMappingURL=index.js.map
},{"./lang/toplevel/repl":14,"./reader/browser":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

// -----------------------------------------------------------------------------
// Generic entity definition
// -----------------------------------------------------------------------------

var /*abstract*/Entity /* 'a */ = function Entity() {
    _classCallCheck(this, Entity);
};

var Definition = function (_Entity) {
    _inherits(Definition, _Entity);

    // String -> Expression
    function Definition(name, expression) {
        _classCallCheck(this, Definition);

        var _this = _possibleConstructorReturn(this, (Definition.__proto__ || Object.getPrototypeOf(Definition)).call(this));

        _this.name = name;
        _this.expression = expression;
        return _this;
    }

    // Visitor 'b -> 'b


    _createClass(Definition, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.definition(this);
        }
    }]);

    return Definition;
}(Entity /* 'a */);

var Main = function (_Entity2) {
    _inherits(Main, _Entity2);

    // String -> Expression
    function Main(expression) {
        _classCallCheck(this, Main);

        var _this2 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        _this2.expression = expression;
        return _this2;
    }

    // Visitor 'b -> 'b


    _createClass(Main, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.main(this);
        }
    }]);

    return Main;
}(Entity /* 'a */);

// -----------------------------------------------------------------------------

var /*abstract*/Expression = function Expression() {
    _classCallCheck(this, Expression);
};

var Ident = function (_Expression) {
    _inherits(Ident, _Expression);

    // String -> Expression
    function Ident(name) {
        _classCallCheck(this, Ident);

        var _this3 = _possibleConstructorReturn(this, (Ident.__proto__ || Object.getPrototypeOf(Ident)).call(this));

        _this3.name = name;
        return _this3;
    }

    // Visitor 'a -> 'a


    _createClass(Ident, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.ident(this);
        }
    }]);

    return Ident;
}(Expression);

var Native = function (_Expression2) {
    _inherits(Native, _Expression2);

    // String, Number -> Expression
    function Native(name) {
        _classCallCheck(this, Native);

        var _this4 = _possibleConstructorReturn(this, (Native.__proto__ || Object.getPrototypeOf(Native)).call(this));

        _this4.name = name;
        return _this4;
    }

    // Visitor 'a -> 'a


    _createClass(Native, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.native(this);
        }
    }]);

    return Native;
}(Expression);

var Constant = function (_Expression3) {
    _inherits(Constant, _Expression3);

    // Number|String|Char -> Expression
    function Constant(value) {
        _classCallCheck(this, Constant);

        var _this5 = _possibleConstructorReturn(this, (Constant.__proto__ || Object.getPrototypeOf(Constant)).call(this));

        _this5.value = value;
        return _this5;
    }

    // Visitor 'a -> 'a


    _createClass(Constant, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.constant(this);
        }
    }]);

    return Constant;
}(Expression);

var Application = function (_Expression4) {
    _inherits(Application, _Expression4);

    // Abstraction, Expression -> Expression
    function Application(abstraction, argument) {
        _classCallCheck(this, Application);

        var _this6 = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

        _this6.abstraction = abstraction;
        _this6.argument = argument;
        return _this6;
    }

    // Visitor 'a -> 'a


    _createClass(Application, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.application(this);
        }
    }]);

    return Application;
}(Expression);

var Abstraction = function (_Expression5) {
    _inherits(Abstraction, _Expression5);

    // String, Expression -> Expression
    function Abstraction(variable, body) {
        _classCallCheck(this, Abstraction);

        var _this7 = _possibleConstructorReturn(this, (Abstraction.__proto__ || Object.getPrototypeOf(Abstraction)).call(this));

        _this7.variable = variable;
        _this7.body = body;
        return _this7;
    }

    // Visitor 'a -> 'a


    _createClass(Abstraction, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.abstraction(this);
        }
    }]);

    return Abstraction;
}(Expression);

exports.default = {
    ident: function ident(n) {
        return new Ident(n);
    },
    constant: function constant(c) {
        return new Constant(c);
    },
    native: function native(n) {
        return new Native(n);
    },
    application: function application(f, a) {
        return new Application(f, a);
    },
    abstraction: function abstraction(v, b) {
        return new Abstraction(v, b);
    },
    definition: function definition(n, e) {
        return new Definition(n, e);
    },
    main: function main(e) {
        return new Main(e);
    }
};
//# sourceMappingURL=ast.js.map
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parserCombinator = require('parser-combinator');

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

require('../../extensions/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Facilities provided by the generic lexer library
var tkNumber = _parserCombinator.genlex.token.parser.number,
    tkString = _parserCombinator.genlex.token.parser.string,
    tkIdent = _parserCombinator.genlex.token.parser.ident,
    tkKeyword = function tkKeyword(s) {
    return _parserCombinator.genlex.token.parser.keyword.match(s).drop();
};

// unit -> Parser Expression Token
/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */
function atom() {
    return tkIdent.map(_ast2.default.ident).or(tkNumber.map(_ast2.default.constant)).or(tkString.map(_ast2.default.constant));
}

// unit -> Parser Expression Token
function abstraction() {
    return tkKeyword('{').then(tkIdent.rep().then(tkKeyword('->')).opt().map(function (t) {
        return t.orElse(['_']);
    })).then(_parserCombinator.F.lazy(expression)).then(tkKeyword('}')).map(function (t) {
        return t[0].array().foldRight(_ast2.default.abstraction, t[1]);
    });
}

// unit -> Parser Expression Token
function native() {
    return tkKeyword('native').then(tkString.map(_ast2.default.native));
}

// unit -> Parser Expression Token
function block() {
    return tkKeyword('(').then(_parserCombinator.F.lazy(expression).opt().map(function (t) {
        return t.orElse(_ast2.default.constant(_parserCombinator.data.unit));
    })).then(tkKeyword(')'));
}

// unit -> Parser Expression Token
function endBlock() {
    return tkKeyword('$').then(_parserCombinator.F.lazy(expression));
}

// unit -> Parser Expression Token
function simpleExpression() {
    return abstraction().or(block()).or(endBlock()).or(atom()).or(native());
}

// unit -> Parser Expression Token
function expression() {
    return simpleExpression().then(simpleExpression().optrep()).map(function (t) {
        return t[1].array().foldLeft(t[0], _ast2.default.application);
    });
}

// unit -> Parser Entity Token
function definition() {
    return tkKeyword('def').then(tkIdent).then(simpleExpression()).map(function (t) {
        return _ast2.default.definition(t[0], t[1]);
    });
}

// unit -> Parser Entity Token
function main() {
    return expression().map(_ast2.default.main);
}

// unit -> Parser [Entity] Token
function entities() {
    return definition().or(main()).optrep();
}

// Parser a' Token -> Parser a' char
function analyzer(parser) {
    return _parserCombinator.genlex.genlex.generator(['def', 'native', '{', '}', '->', '(', ')', '$']).tokenBetweenSpaces(_parserCombinator.genlex.token.builder).chain(parser.then(_parserCombinator.F.eos.drop())).parse;
}

exports.default = {
    expression: analyzer(expression()),
    entities: analyzer(entities())
};
//# sourceMappingURL=parser.js.map
},{"../../extensions/array":1,"./ast":3,"parser-combinator":25}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ast = require("../analyzer/ast");

var _ast2 = _interopRequireDefault(_ast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * mFun
                                                                                                                                                           * https://github.com/d-plaindoux/mFun
                                                                                                                                                           *
                                                                                                                                                           * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                           * Licensed under the LGPL2 license.
                                                                                                                                                           */

var /*abstract*/DeBruijnExpression = function DeBruijnExpression() {
    _classCallCheck(this, DeBruijnExpression);
};

var Ident = function (_DeBruijnExpression) {
    _inherits(Ident, _DeBruijnExpression);

    // String -> DeBruijnExpression
    function Ident(name) {
        _classCallCheck(this, Ident);

        var _this = _possibleConstructorReturn(this, (Ident.__proto__ || Object.getPrototypeOf(Ident)).call(this));

        _this.name = name;
        return _this;
    }

    // Visitor 'a -> 'a


    _createClass(Ident, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.ident(this);
        }
    }]);

    return Ident;
}(DeBruijnExpression);

var Native = function (_DeBruijnExpression2) {
    _inherits(Native, _DeBruijnExpression2);

    // String, Number -> DeBruijnExpression
    function Native(name) {
        _classCallCheck(this, Native);

        var _this2 = _possibleConstructorReturn(this, (Native.__proto__ || Object.getPrototypeOf(Native)).call(this));

        _this2.name = name;
        return _this2;
    }

    // Visitor 'a -> 'a


    _createClass(Native, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.native(this);
        }
    }]);

    return Native;
}(DeBruijnExpression);

var Constant = function (_DeBruijnExpression3) {
    _inherits(Constant, _DeBruijnExpression3);

    // Number|String|Char -> DeBruijnExpression
    function Constant(value) {
        _classCallCheck(this, Constant);

        var _this3 = _possibleConstructorReturn(this, (Constant.__proto__ || Object.getPrototypeOf(Constant)).call(this));

        _this3.value = value;
        return _this3;
    }

    // Visitor 'a -> 'a


    _createClass(Constant, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.constant(this);
        }
    }]);

    return Constant;
}(DeBruijnExpression);

var Application = function (_DeBruijnExpression4) {
    _inherits(Application, _DeBruijnExpression4);

    // Abstraction, DeBruijnExpression -> DeBruijnExpression
    function Application(abstraction, argument) {
        _classCallCheck(this, Application);

        var _this4 = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

        _this4.abstraction = abstraction;
        _this4.argument = argument;
        return _this4;
    }

    // Visitor 'a -> 'a


    _createClass(Application, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.application(this);
        }
    }]);

    return Application;
}(DeBruijnExpression);

var Abstraction = function (_DeBruijnExpression5) {
    _inherits(Abstraction, _DeBruijnExpression5);

    // String, DeBruijnExpression -> DeBruijnExpression
    function Abstraction(body) {
        _classCallCheck(this, Abstraction);

        var _this5 = _possibleConstructorReturn(this, (Abstraction.__proto__ || Object.getPrototypeOf(Abstraction)).call(this));

        _this5.body = body;
        return _this5;
    }

    // Visitor 'a -> 'a


    _createClass(Abstraction, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.abstraction(this);
        }
    }]);

    return Abstraction;
}(DeBruijnExpression);

var Variable = function (_DeBruijnExpression6) {
    _inherits(Variable, _DeBruijnExpression6);

    // String -> DeBruijnExpression
    function Variable(index) {
        _classCallCheck(this, Variable);

        var _this6 = _possibleConstructorReturn(this, (Variable.__proto__ || Object.getPrototypeOf(Variable)).call(this));

        _this6.index = index;
        return _this6;
    }

    // Visitor 'a -> 'a


    _createClass(Variable, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.variable(this);
        }
    }]);

    return Variable;
}(DeBruijnExpression);

exports.default = {
    ident: function ident(n) {
        return new Ident(n);
    },
    constant: function constant(c) {
        return new Constant(c);
    },
    native: function native(n) {
        return new Native(n);
    },
    application: function application(f, a) {
        return new Application(f, a);
    },
    abstraction: function abstraction(b) {
        return new Abstraction(b);
    },
    variable: function variable(n) {
        return new Variable(n);
    },
    definition: _ast2.default.definition,
    main: _ast2.default.main
};
//# sourceMappingURL=ast-debruijn.js.map
},{"../analyzer/ast":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _astDebruijn = require("./ast-debruijn");

var _astDebruijn2 = _interopRequireDefault(_astDebruijn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * mFun
                                                                                                                                                           * https://github.com/d-plaindoux/mFun
                                                                                                                                                           *
                                                                                                                                                           * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                           * Licensed under the LGPL2 license.
                                                                                                                                                           */

var /*abstract*/Objcode = function Objcode() {
    _classCallCheck(this, Objcode);
};

var Access = function (_Objcode) {
    _inherits(Access, _Objcode);

    function Access(index) {
        _classCallCheck(this, Access);

        var _this = _possibleConstructorReturn(this, (Access.__proto__ || Object.getPrototypeOf(Access)).call(this));

        _this.index = index;
        return _this;
    }

    _createClass(Access, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.access(this);
        }
    }]);

    return Access;
}(Objcode);

var Closure = function (_Objcode2) {
    _inherits(Closure, _Objcode2);

    function Closure(instructions) {
        _classCallCheck(this, Closure);

        var _this2 = _possibleConstructorReturn(this, (Closure.__proto__ || Object.getPrototypeOf(Closure)).call(this));

        _this2.instructions = instructions;
        return _this2;
    }

    _createClass(Closure, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.closure(this);
        }
    }]);

    return Closure;
}(Objcode);

var Returns = function (_Objcode3) {
    _inherits(Returns, _Objcode3);

    function Returns() {
        _classCallCheck(this, Returns);

        return _possibleConstructorReturn(this, (Returns.__proto__ || Object.getPrototypeOf(Returns)).apply(this, arguments));
    }

    _createClass(Returns, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.returns();
        }
    }]);

    return Returns;
}(Objcode);

var Apply = function (_Objcode4) {
    _inherits(Apply, _Objcode4);

    function Apply() {
        _classCallCheck(this, Apply);

        return _possibleConstructorReturn(this, (Apply.__proto__ || Object.getPrototypeOf(Apply)).apply(this, arguments));
    }

    _createClass(Apply, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.apply();
        }
    }]);

    return Apply;
}(Objcode);

// Extra instructions

var Constant = function (_Objcode5) {
    _inherits(Constant, _Objcode5);

    // Number|String|Char -> Objcode
    function Constant(value) {
        _classCallCheck(this, Constant);

        var _this5 = _possibleConstructorReturn(this, (Constant.__proto__ || Object.getPrototypeOf(Constant)).call(this));

        _this5.value = value;
        return _this5;
    }

    // Visitor 'a -> 'a


    _createClass(Constant, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.constant(this);
        }
    }]);

    return Constant;
}(Objcode);

var Ident = function (_Objcode6) {
    _inherits(Ident, _Objcode6);

    // Number -> Objcode
    function Ident(name) {
        _classCallCheck(this, Ident);

        var _this6 = _possibleConstructorReturn(this, (Ident.__proto__ || Object.getPrototypeOf(Ident)).call(this));

        _this6.name = name;
        return _this6;
    }

    // Visitor 'a -> 'a


    _createClass(Ident, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.ident(this);
        }
    }]);

    return Ident;
}(Objcode);

var Native = function (_Objcode7) {
    _inherits(Native, _Objcode7);

    // String, Number -> Objcode
    function Native(name) {
        _classCallCheck(this, Native);

        var _this7 = _possibleConstructorReturn(this, (Native.__proto__ || Object.getPrototypeOf(Native)).call(this));

        _this7.name = name;
        return _this7;
    }

    // Visitor 'a -> 'a


    _createClass(Native, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.native(this);
        }
    }]);

    return Native;
}(Objcode);

exports.default = {
    access: function access(i) {
        return new Access(i);
    },
    closure: function closure(i) {
        return new Closure(i);
    },
    returns: new Returns(),
    apply: new Apply(),
    ident: function ident(c) {
        return new Ident(c);
    },
    constant: function constant(c) {
        return new Constant(c);
    },
    native: function native(n) {
        return new Native(n);
    },
    definition: _astDebruijn2.default.definition,
    main: _astDebruijn2.default.main
};
//# sourceMappingURL=ast-objcode.js.map
},{"./ast-debruijn":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = function (e) {
    return e.visit(new Transformer([]));
};

var _astDebruijn = require('./ast-debruijn');

var _astDebruijn2 = _interopRequireDefault(_astDebruijn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transformer = function () {
    function Transformer(variables) {
        _classCallCheck(this, Transformer);

        this.variables = variables;
    }

    _createClass(Transformer, [{
        key: 'definition',
        value: function definition(d) {
            return _astDebruijn2.default.definition(d.name, d.expression.visit(this));
        }
    }, {
        key: 'main',
        value: function main(m) {
            return _astDebruijn2.default.main(m.expression.visit(this));
        }
    }, {
        key: 'ident',
        value: function ident(i) {
            var index = this.variables.indexOf(i.name);

            if (index == -1) {
                return _astDebruijn2.default.ident(i.name);
            }

            return _astDebruijn2.default.variable(index + 1);
        }
    }, {
        key: 'constant',
        value: function constant(c) {
            return _astDebruijn2.default.constant(c.value);
        }
    }, {
        key: 'native',
        value: function native(n) {
            return _astDebruijn2.default.native(n.name);
        }
    }, {
        key: 'application',
        value: function application(a) {
            return _astDebruijn2.default.application(a.abstraction.visit(this), a.argument.visit(this));
        }
    }, {
        key: 'abstraction',
        value: function abstraction(a) {
            var newVariables = [a.variable].concat(this.variables),
                newTransformer = new Transformer(newVariables);

            return _astDebruijn2.default.abstraction(a.body.visit(newTransformer));
        }
    }]);

    return Transformer;
}();
//# sourceMappingURL=debruijn.js.map
},{"./ast-debruijn":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = function (e) {
    return e.visit(new Generator([]));
};

var _astObjcode = require('./ast-objcode');

var _astObjcode2 = _interopRequireDefault(_astObjcode);

require('../../extensions/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = function () {
    function Generator(variables) {
        _classCallCheck(this, Generator);

        this.variables = variables;
    }

    _createClass(Generator, [{
        key: 'definition',
        value: function definition(d) {
            return _astObjcode2.default.definition(d.name, d.expression.visit(this));
        }
    }, {
        key: 'main',
        value: function main(m) {
            return _astObjcode2.default.main(m.expression.visit(this));
        }
    }, {
        key: 'ident',
        value: function ident(i) {
            return [_astObjcode2.default.ident(i.name)];
        }
    }, {
        key: 'variable',
        value: function variable(i) {
            return [_astObjcode2.default.access(i.index)];
        }
    }, {
        key: 'constant',
        value: function constant(c) {
            return [_astObjcode2.default.constant(c.value)];
        }
    }, {
        key: 'native',
        value: function native(n) {
            return [_astObjcode2.default.native(n.name)];
        }
    }, {
        key: 'application',
        value: function application(a) {
            return a.abstraction.visit(this).concat(a.argument.visit(this)).concat(_astObjcode2.default.apply);
        }
    }, {
        key: 'abstraction',
        value: function abstraction(a) {
            return [_astObjcode2.default.closure(a.body.visit(this).concat(_astObjcode2.default.returns))];
        }
    }]);

    return Generator;
}();
//# sourceMappingURL=objcode.js.map
},{"../../extensions/array":1,"./ast-objcode":6}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

var /*abstract*/Result = function Result() {
    _classCallCheck(this, Result);
};

var Constant = function (_Result) {
    _inherits(Constant, _Result);

    // Number|String|Char|unit -> ResultCode
    function Constant(value) {
        _classCallCheck(this, Constant);

        var _this = _possibleConstructorReturn(this, (Constant.__proto__ || Object.getPrototypeOf(Constant)).call(this));

        _this.value = value;
        return _this;
    }

    _createClass(Constant, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.constant(this);
        }
    }]);

    return Constant;
}(Result);

var Closure = function (_Result2) {
    _inherits(Closure, _Result2);

    function Closure(code, env) {
        _classCallCheck(this, Closure);

        var _this2 = _possibleConstructorReturn(this, (Closure.__proto__ || Object.getPrototypeOf(Closure)).call(this));

        _this2.code = code;
        _this2.env = env;
        return _this2;
    }

    _createClass(Closure, [{
        key: "visit",
        value: function visit(visitor) {
            return visitor.closure(this);
        }
    }]);

    return Closure;
}(Result);

exports.default = {
    closure: function closure(c, e) {
        return new Closure(c, e);
    },
    constant: function constant(v) {
        return new Constant(v);
    }
};
//# sourceMappingURL=ast-result.js.map
},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _parserCombinator = require("parser-combinator");

var _native2 = require("./native");

var _native3 = _interopRequireDefault(_native2);

var _astResult = require("./ast-result");

var _astResult2 = _interopRequireDefault(_astResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetClosure = function () {
    function GetClosure() {
        _classCallCheck(this, GetClosure);
    }

    _createClass(GetClosure, [{
        key: "constant",
        value: function constant(c) {
            throw new EvalError("Waiting for a closure");
        }
    }, {
        key: "closure",
        value: function closure(c) {
            return c;
        }
    }]);

    return GetClosure;
}();

var Machine = function () {
    function Machine() {
        _classCallCheck(this, Machine);

        this.getClosure = new GetClosure();
        this.definitions = {};
        this.init([]);
    }

    _createClass(Machine, [{
        key: "init",
        value: function init(code) {
            this.code = code;
            this.env = [];
            this.stack = [];
        }

        // :: [Objcode] -> Try EvaluatedCode

    }, {
        key: "execute",
        value: function execute(code) {
            this.init(code);

            while (this.code.length > 0) {
                try {
                    this.code.shift().visit(this);
                } catch (e) {
                    return _parserCombinator.data.atry.failure(e);
                }
            }

            return _parserCombinator.data.atry.success(this.stack.shift());
        }
    }, {
        key: "access",
        value: function access(i) {
            this.stack.unshift(this.env[i.index - 1]);
        }
    }, {
        key: "closure",
        value: function closure(i) {
            this.stack.unshift(_astResult2.default.closure(i.instructions, this.env.slice()));
        }
    }, {
        key: "apply",
        value: function apply() {
            var v = this.stack.shift(),
                c = this.stack.shift().visit(this.getClosure);

            this.stack.unshift(this.env);
            this.stack.unshift(this.code);

            this.code = c.code.slice();
            this.env = c.env.slice();

            this.env.unshift(v);
        }
    }, {
        key: "returns",
        value: function returns() {
            var v = this.stack.shift(),
                c = this.stack.shift(),
                e = this.stack.shift();

            this.code = c.slice();
            this.env = e.slice();

            this.stack.unshift(v);
        }
    }, {
        key: "constant",
        value: function constant(m) {
            this.stack.unshift(_astResult2.default.constant(m.value));
        }
    }, {
        key: "ident",
        value: function ident(i) {
            this.stack.unshift(this.definitions[i.name]);
        }
    }, {
        key: "native",
        value: function native(n) {
            this.stack.unshift(_native3.default[n.name](this.env.slice()));
        }

        // -------------------------------------------------------------------------

    }, {
        key: "definition",
        value: function definition(d) {
            var _this = this;

            return this.execute(d.expression).onSuccess(function (r) {
                return _this.definitions[d.name] = r;
            });
        }
    }, {
        key: "main",
        value: function main(m) {
            return this.execute(m.expression);
        }

        // :: Entity Objcode -> Try EvaluatedCode

    }, {
        key: "eval",
        value: function _eval(e) {
            return e.visit(this);
        }
    }]);

    return Machine;
}();

// Factory :: unit -> Machine


exports.default = function () {
    return new Machine();
};
//# sourceMappingURL=machine.js.map
},{"./ast-result":9,"./native":11,"parser-combinator":25}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _astResult = require('./ast-result');

var _astResult2 = _interopRequireDefault(_astResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remember De Bruijn indexes

exports.default = {
    // Number operations
    'add': function add(env) {
        var a = env[1].value,
            b = env[0].value;

        return _astResult2.default.constant(a + b);
    },
    'minus': function minus(env) {
        var a = env[1].value,
            b = env[0].value;

        return _astResult2.default.constant(a - b);
    },
    'mult': function mult(env) {
        var a = env[1].value,
            b = env[0].value;

        return _astResult2.default.constant(a * b);
    },
    // Predicates
    'equal': function equal(env) {
        var a = env[3].value,
            b = env[2].value,
            t = env[1].value,
            f = env[0].value;

        return a === b ? t : f;
    },
    'leq': function leq(env) {
        var a = env[3].value,
            b = env[2].value,
            t = env[1].value,
            f = env[0].value;

        return a <= b ? t : f;
    }
}; /*
    * mFun
    * https://github.com/d-plaindoux/mFun
    *
    * Copyright (c) 2019 Didier Plaindoux
    * Licensed under the LGPL2 license.
    */
//# sourceMappingURL=native.js.map
},{"./ast-result":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/mFun
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2019 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _parserCombinator = require("parser-combinator");

var _parser = require("../analyzer/parser");

var _parser2 = _interopRequireDefault(_parser);

var _debruijn = require("../compiler/debruijn");

var _debruijn2 = _interopRequireDefault(_debruijn);

var _objcode = require("../compiler/objcode");

var _objcode2 = _interopRequireDefault(_objcode);

var _machine = require("../runtime/machine");

var _machine2 = _interopRequireDefault(_machine);

require("../../extensions/array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eval = function () {
    function Eval() {
        _classCallCheck(this, Eval);

        this.machine = (0, _machine2.default)();
    }

    // :: [Entity Objcode] -> Try [EvaluatedCode]


    _createClass(Eval, [{
        key: "evalAtMost",
        value: function evalAtMost(a) {
            var _this = this;

            return a.foldLeft(_parserCombinator.data.atry.success([]), function (l, c) {
                return l.flatmap(function (l) {
                    return _this.machine.eval(c).map(function (c) {
                        return l.concat([c]);
                    });
                });
            } // List comprehension like
            );
        }

        // :: String -> Try [Objcode]

    }, {
        key: "apply",
        value: function apply(source) {
            return _parser2.default.entities(_parserCombinator.stream.ofString(source)) // Response (List Entity)
            .toTry() // Try (List (Entity Expression))
            .map(function (l) {
                return l.array();
            }) // Try [Entity Expression]
            .map(function (a) {
                return a.map(_debruijn2.default);
            }) // Try [Entity DeBruijnExpression]
            .map(function (a) {
                return a.map(_objcode2.default);
            }) // Try [Entity Objcode]
            .flatmap(this.evalAtMost.bind(this)); // Try [EvaluatedCode]
        }
    }]);

    return Eval;
}();

// Factory :: unit -> Eval


exports.default = function () {
    return new Eval();
};
//# sourceMappingURL=evaluator.js.map
},{"../../extensions/array":1,"../analyzer/parser":4,"../compiler/debruijn":7,"../compiler/objcode":8,"../runtime/machine":10,"parser-combinator":25}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * mFun
 * https://github.com/d-plaindoux/mFun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

var Printer = function () {
    function Printer() {
        _classCallCheck(this, Printer);
    }

    _createClass(Printer, [{
        key: "constant",
        value: function constant(c) {
            console.log(c.value);
        }
    }, {
        key: "closure",
        value: function closure(c) {
            console.log("<function>");
        }
    }, {
        key: "apply",
        value: function apply(c) {
            c.visit(this);
        }
    }]);

    return Printer;
}();

// Factory :: unit -> Printer


exports.default = function () {
    return new Printer();
};
//# sourceMappingURL=printer.js.map
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _evaluator = require('./evaluator');

var _evaluator2 = _interopRequireDefault(_evaluator);

var _printer = require('./printer');

var _printer2 = _interopRequireDefault(_printer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

exports.default = function (r) {
  (0, _evaluator2.default)().apply(r()).onSuccess((0, _printer2.default)());
};
//# sourceMappingURL=eval_print.js.map
},{"./evaluator":12,"./printer":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/*
 * mfun
 * https://github.com/d-plaindoux/mfun
 *
 * Copyright (c) 2019 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/*global document*/

exports.default = function () {
    var scripts = document.getElementsByTagName("script");
    var sourceCode = "";

    scripts.forEach(function (script) {
        if (script.getAttribute("type") === "application/mfun") {
            sourceCode += script.innerHTML + "\n";
        }
    });

    return sourceCode;
};
//# sourceMappingURL=browser.js.map
},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _try = require('./try');

var _try2 = _interopRequireDefault(_try);

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  option: _option2.default,
  atry: _try2.default,
  unit: _unit2.default
}; /*
    * Parsec
    * https://github.com/d-plaindoux/parsec
    *
    * Copyright (c) 2016 Didier Plaindoux
    * Licensed under the LGPL2 license.
    */
//# sourceMappingURL=index.js.map
},{"./option":18,"./try":19,"./unit":20}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return new List(arguments[0]);
    }

    return new List(Array.prototype.slice.call(arguments));
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2015-2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

var List = function () {
    function List(value) {
        _classCallCheck(this, List);

        this.value = value;
    }

    _createClass(List, [{
        key: "size",
        value: function size() {
            return this.value.length;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.value.length === 0;
        }
    }, {
        key: "add",
        value: function add(element) {
            return new List(this.value.concat([element]));
        }
    }, {
        key: "append",
        value: function append(list) {
            return new List(this.value.concat(list.value));
        }
    }, {
        key: "filter",
        value: function filter(funcall) {
            var result = [];
            for (var i = 0; i < this.value.length; i++) {
                if (funcall(this.value[i])) {
                    result.push(this.value[i]);
                }
            }
            return new List(result);
        }
    }, {
        key: "map",
        value: function map(funcall) {
            return new List(this.value.map(funcall));
        }
    }, {
        key: "flatmap",
        value: function flatmap(funcall) {
            var result = new List([]);
            this.value.forEach(function (value) {
                result = result.append(funcall(value));
            });
            return result;
        }
    }, {
        key: "array",
        value: function array() {
            return this.value.slice();
        }
    }, {
        key: "join",
        value: function join(sep) {
            return this.value.join(sep);
        }
    }]);

    return List;
}();
//# sourceMappingURL=list.js.map
},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

/**
 * Private class Option, accessible from someOrNone() or none()
 */
var Option = function () {
    function Option(value) {
        _classCallCheck(this, Option);

        this.value = value;
    }

    _createClass(Option, [{
        key: "isPresent",
        value: function isPresent() {
            return this.value !== null && this.value !== undefined;
        }
    }, {
        key: "map",
        value: function map(bindCall) {
            if (this.isPresent()) {
                return someOrNone(bindCall(this.value));
            } else {
                return this;
            }
        }
    }, {
        key: "flatmap",
        value: function flatmap(bindCall) {
            if (this.isPresent()) {
                return bindCall(this.value);
            } else {
                return this;
            }
        }
    }, {
        key: "filter",
        value: function filter(f) {
            if (this.isPresent() && f(this.value)) {
                return this;
            }

            // equivalent of return none() without cyclic creation
            // eslint : no-use-before-define
            return new Option();
        }
    }, {
        key: "get",
        value: function get() {
            return this.value;
        }
    }, {
        key: "orElse",
        value: function orElse(value) {
            if (this.isPresent()) {
                return this.value;
            } else {
                return value;
            }
        }
    }, {
        key: "orLazyElse",
        value: function orLazyElse(value) {
            if (this.isPresent()) {
                return this.value;
            } else {
                return value();
            }
        }
    }]);

    return Option;
}();

function someOrNone(value) {
    return new Option(value);
}

function none() {
    return new Option();
}

exports.default = {
    some: someOrNone,
    none: none
};
//# sourceMappingURL=option.js.map
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

var Try = function () {
    function Try(value, error) {
        _classCallCheck(this, Try);

        this.value = value;
        this.error = error;
    }

    _createClass(Try, [{
        key: 'isSuccess',
        value: function isSuccess() {
            return this.error === null;
        }
    }, {
        key: 'isFailure',
        value: function isFailure() {
            return !this.isSuccess();
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(bindCall) {
            if (this.isSuccess()) {
                bindCall(this.value);
            }

            return this;
        }
    }, {
        key: 'onFailure',
        value: function onFailure(bindCall) {
            if (this.isFailure()) {
                bindCall(this.error);
            }

            return this;
        }
    }, {
        key: 'map',
        value: function map(bindCall) {
            if (this.isSuccess()) {
                try {
                    return success(bindCall(this.value));
                } catch (e) {
                    return failure(e);
                }
            } else {
                return this;
            }
        }
    }, {
        key: 'flatmap',
        value: function flatmap(bindCall) {
            if (this.isSuccess()) {
                try {
                    return bindCall(this.value);
                } catch (e) {
                    return failure(e);
                }
            } else {
                return this;
            }
        }
    }, {
        key: 'success',
        value: function success() {
            return this.value;
        }
    }, {
        key: 'failure',
        value: function failure() {
            return this.error;
        }
    }, {
        key: 'recoverWith',
        value: function recoverWith(value) {
            if (this.isSuccess()) {
                return this.value;
            } else {
                return value;
            }
        }
    }, {
        key: 'lazyRecoverWith',
        value: function lazyRecoverWith(value) {
            if (this.isSuccess()) {
                return this.value;
            } else {
                return value(this.error);
            }
        }
    }, {
        key: 'filter',
        value: function filter(f) {
            if (this.isSuccess()) {
                if (f(this.value)) {
                    return this;
                } else {
                    return failure(new Error('invalid filter'));
                }
            }

            return this;
        }
    }]);

    return Try;
}();

function success(value) {
    return new Try(value, null);
}

function failure(error) {
    return new Try(null, error);
}

exports.default = {
    success: success,
    failure: failure
};
//# sourceMappingURL=try.js.map
},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

var Unit = function Unit() {
  _classCallCheck(this, Unit);
};

exports.default = new Unit();
//# sourceMappingURL=unit.js.map
},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _flowBundle = require('../parsec/flow-bundle');

var _flowBundle2 = _interopRequireDefault(_flowBundle);

var _charsBundle = require('../../lib/parsec/chars-bundle');

var _charsBundle2 = _interopRequireDefault(_charsBundle);

var _numbersBundle = require('../../lib/parsec/numbers-bundle');

var _numbersBundle2 = _interopRequireDefault(_numbersBundle);

var _unit = require('../data/unit.js');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (string -> 'a,string -> 'a,number -> 'a,string -> 'a,char -> 'a) -> GenlexFactory 'a
function GenlexFactory(keyword, ident, number, string, char) {
    this.keyword = keyword;
    this.ident = ident;
    this.number = number;
    this.string = string;
    this.char = char;
}

var Genlex = function () {
    // [String] -> Genlex
    function Genlex() {
        var keywords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Genlex);

        var idletter = _charsBundle2.default.letter.or(_charsBundle2.default.char('_')).or(_numbersBundle2.default.digit);
        this.identParser = _charsBundle2.default.letter.then(idletter.optrep()).map(function (r) {
            return [r[0]].concat(r[1].array()).join('');
        });
        this.keywordParser = keywords.reduce(function (p, s) {
            return _charsBundle2.default.string(s).or(p);
        }, _flowBundle2.default.error);
    }

    // unit -> Parser char char


    _createClass(Genlex, [{
        key: 'space',
        value: function space() {
            return _charsBundle2.default.charIn(' \r\n\f\t');
        }

        // unit -> Parser unit char

    }, {
        key: 'spaces',
        value: function spaces() {
            return this.space().optrep().map(function () {
                return _unit2.default;
            });
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'keyword',
        value: function keyword(f) {
            return this.keywordParser.map(f.keyword);
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'ident',
        value: function ident(f) {
            return this.identParser.map(f.ident);
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'number',
        value: function number(f) {
            return _numbersBundle2.default.numberLiteral.map(f.number);
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'string',
        value: function string(f) {
            return _charsBundle2.default.stringLiteral.map(f.string);
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'char',
        value: function char(f) {
            return _charsBundle2.default.charLiteral.map(f.char);
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'token',
        value: function token(f) {
            return this.keyword(f).or(this.ident(f)).or(this.number(f)).or(this.string(f)).or(this.char(f));
        }

        // GenLexFactory 'a -> Parser 'a char

    }, {
        key: 'tokenBetweenSpaces',
        value: function tokenBetweenSpaces(f) {
            return this.spaces().thenRight(this.token(f)).thenLeft(this.spaces());
        }

        // GenLexFactory 'a -> Parser ['a] char

    }, {
        key: 'tokens',
        value: function tokens(f) {
            return this.tokenBetweenSpaces(f).optrep().thenLeft(_flowBundle2.default.eos).map(function (r) {
                return r.array();
            });
        }
    }]);

    return Genlex;
}();

exports.default = {
    factory: function factory(keyword, ident, number, string, char) {
        return new GenlexFactory(keyword, ident, number, string, char);
    },
    generator: function generator(keywords) {
        return new Genlex(keywords);
    }
};
//# sourceMappingURL=genlex.js.map
},{"../../lib/parsec/chars-bundle":26,"../../lib/parsec/numbers-bundle":29,"../data/unit.js":20,"../parsec/flow-bundle":27}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _genlex = require('./genlex');

var _genlex2 = _interopRequireDefault(_genlex);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _tokenizer = require('./tokenizer');

var _tokenizer2 = _interopRequireDefault(_tokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  genlex: _genlex2.default,
  token: _token2.default,
  tokenizer: _tokenizer2.default
}; /*
    * Parsec
    * https://github.com/d-plaindoux/parsec
    *
    * Copyright (c) 2016 Didier Plaindoux
    * Licensed under the LGPL2 license.
    */
//# sourceMappingURL=index.js.map
},{"./genlex":21,"./token":23,"./tokenizer":24}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _response = require('../parsec/response');

var _response2 = _interopRequireDefault(_response);

var _option = require('../data/option');

var _option2 = _interopRequireDefault(_option);

var _flowBundle = require('../parsec/flow-bundle');

var _flowBundle2 = _interopRequireDefault(_flowBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
    function Token() {
        _classCallCheck(this, Token);
    }

    _createClass(Token, [{
        key: 'keyword',
        value: function keyword() {
            return _option2.default.none();
        }
    }, {
        key: 'ident',
        value: function ident() {
            return _option2.default.none();
        }
    }, {
        key: 'number',
        value: function number() {
            return _option2.default.none();
        }
    }, {
        key: 'string',
        value: function string() {
            return _option2.default.none();
        }
    }, {
        key: 'char',
        value: function char() {
            return _option2.default.none();
        }
    }]);

    return Token;
}();

var TKKeyword = function (_Token) {
    _inherits(TKKeyword, _Token);

    function TKKeyword(value) {
        _classCallCheck(this, TKKeyword);

        var _this = _possibleConstructorReturn(this, (TKKeyword.__proto__ || Object.getPrototypeOf(TKKeyword)).call(this));

        _this.value = value;
        return _this;
    }

    _createClass(TKKeyword, [{
        key: 'keyword',
        value: function keyword() {
            return _option2.default.some(this.value);
        }
    }]);

    return TKKeyword;
}(Token);

var TKIdent = function (_Token2) {
    _inherits(TKIdent, _Token2);

    function TKIdent(value) {
        _classCallCheck(this, TKIdent);

        var _this2 = _possibleConstructorReturn(this, (TKIdent.__proto__ || Object.getPrototypeOf(TKIdent)).call(this));

        _this2.value = value;
        return _this2;
    }

    _createClass(TKIdent, [{
        key: 'ident',
        value: function ident() {
            return _option2.default.some(this.value);
        }
    }]);

    return TKIdent;
}(Token);

var TKNumber = function (_Token3) {
    _inherits(TKNumber, _Token3);

    function TKNumber(value) {
        _classCallCheck(this, TKNumber);

        var _this3 = _possibleConstructorReturn(this, (TKNumber.__proto__ || Object.getPrototypeOf(TKNumber)).call(this));

        _this3.value = value;
        return _this3;
    }

    _createClass(TKNumber, [{
        key: 'number',
        value: function number() {
            return _option2.default.some(this.value);
        }
    }]);

    return TKNumber;
}(Token);

var TKString = function (_Token4) {
    _inherits(TKString, _Token4);

    function TKString(value) {
        _classCallCheck(this, TKString);

        var _this4 = _possibleConstructorReturn(this, (TKString.__proto__ || Object.getPrototypeOf(TKString)).call(this));

        _this4.value = value;
        return _this4;
    }

    _createClass(TKString, [{
        key: 'string',
        value: function string() {
            return _option2.default.some(this.value);
        }
    }]);

    return TKString;
}(Token);

var TKChar = function (_Token5) {
    _inherits(TKChar, _Token5);

    function TKChar(value) {
        _classCallCheck(this, TKChar);

        var _this5 = _possibleConstructorReturn(this, (TKChar.__proto__ || Object.getPrototypeOf(TKChar)).call(this));

        _this5.value = value;
        return _this5;
    }

    _createClass(TKChar, [{
        key: 'char',
        value: function char() {
            return _option2.default.some(this.value);
        }
    }]);

    return TKChar;
}(Token);

// (Token -> Option 'a) -> Parser 'a Token


function literal(tokenise) {
    return _flowBundle2.default.parse(function (input, index) {
        return input.get(index).map(function (value) {
            return tokenise(value).map(function (token) {
                return _response2.default.accept(token, input, index + 1, true);
            }).orLazyElse(function () {
                return _response2.default.reject(input.location(index), false);
            });
        }).lazyRecoverWith(function () {
            return _response2.default.reject(input.location(index), false);
        });
    });
}

var token = {
    builder: {
        keyword: function keyword(value) {
            return new TKKeyword(value);
        },
        ident: function ident(value) {
            return new TKIdent(value);
        },
        number: function number(value) {
            return new TKNumber(value);
        },
        string: function string(value) {
            return new TKString(value);
        },
        char: function char(value) {
            return new TKChar(value);
        }
    },
    parser: {
        keyword: literal(function (token) {
            return token.keyword();
        }),
        ident: literal(function (token) {
            return token.ident();
        }),
        number: literal(function (token) {
            return token.number();
        }),
        string: literal(function (token) {
            return token.string();
        }),
        char: literal(function (token) {
            return token.char();
        })
    }
};

exports.default = token;
//# sourceMappingURL=token.js.map
},{"../data/option":18,"../parsec/flow-bundle":27,"../parsec/response":31}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.default = function (keywords) {
    return new Tokenizer(keywords);
};

var _genlex = require('./genlex');

var _genlex2 = _interopRequireDefault(_genlex);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tokenizer = function () {
    // [String] -> Tokenizer
    function Tokenizer(keywords) {
        _classCallCheck(this, Tokenizer);

        this.parser = _genlex2.default.generator(keywords).tokens(_token2.default.builder);
    }

    // Stream char -> Try [Token]


    _createClass(Tokenizer, [{
        key: 'tokenize',
        value: function tokenize(charstream) {
            return this.parser.parse(charstream, 0).toTry();
        }
    }]);

    return Tokenizer;
}();
//# sourceMappingURL=tokenizer.js.map
},{"./genlex":21,"./token":23}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.T = exports.X = exports.MD = exports.JSON = exports.N = exports.C = exports.F = exports.parser = exports.stream = exports.standard = exports.parsec = exports.genlex = exports.data = undefined;

var _index = require('./data/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./genlex/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./parsec/index');

var _index6 = _interopRequireDefault(_index5);

var _parser = require('./parsec/parser');

var _parser2 = _interopRequireDefault(_parser);

var _index7 = require('./standard/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./stream/index');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSON = _index8.default.jsonParser; /*
                                        * Parsec
                                        * https://github.com/d-plaindoux/parsec
                                        *
                                        * Copyright (c) 2016 Didier Plaindoux
                                        * Licensed under the LGPL2 license.
                                        */

var MD = _index8.default.markdownBundle;
var X = _index8.default.extractorBundle;
var T = _index8.default.tokenBundle;

exports.data = _index2.default;
exports.genlex = _index4.default;
exports.parsec = _index6.default;
exports.standard = _index8.default;
exports.stream = _index10.default;
exports.parser = _parser2.default;
exports.F = _index5.F;
exports.C = _index5.C;
exports.N = _index5.N;
exports.JSON = JSON;
exports.MD = MD;
exports.X = X;
exports.T = T;
//# sourceMappingURL=index.js.map
},{"./data/index":16,"./genlex/index":22,"./parsec/index":28,"./parsec/parser":30,"./standard/index":33,"./stream/index":45}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flowBundle = require('./flow-bundle');

var _flowBundle2 = _interopRequireDefault(_flowBundle);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unit -> Parser char char
function letter() {
    return _flowBundle2.default.satisfy(function (v) {
        return 'a' <= v && v <= 'z' || 'A' <= v && v <= 'Z';
    });
} /*
   * Parsec
   * https://github.com/d-plaindoux/parsec
   *
   * Copyright (c) 2016 Didier Plaindoux
   * Licensed under the LGPL2 license.
   */


function isUtf8Letter(char) {
    var firstLetter = char.toUpperCase();
    return firstLetter.toLowerCase() != firstLetter;
}

function utf8Letter() {
    return _flowBundle2.default.satisfy(function (v) {
        return isUtf8Letter(v);
    });
}

function letters() {
    return letter().rep().map(function (values) {
        return values.join('');
    });
}

// char -> Parser char char
function char(c) {
    if (c.length !== 1) {
        throw new Error('Char parser must contains one character');
    }

    return _flowBundle2.default.satisfy(function (v) {
        return c === v;
    });
}

// char -> Parser char char
function notChar(c) {
    if (c.length !== 1) {
        throw new Error('Char parser must contains one character');
    }

    return _flowBundle2.default.satisfy(function (v) {
        return c !== v;
    });
}

// string -> Parser char char
function charIn(c) {
    return _flowBundle2.default.satisfy(function (v) {
        return c.indexOf(v) !== -1;
    });
}

// string -> Parser char char
function charNotIn(c) {
    return _flowBundle2.default.satisfy(function (v) {
        return c.indexOf(v) === -1;
    });
}

// int -> Parser string char
function subString(length) {
    return _flowBundle2.default.subStream(length).map(function (s) {
        return s.join('');
    });
}

// string -> Parser string char
function string(s) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (input.subStreamAt(s.split(''), index)) {
            return _response2.default.accept(s, input, index + s.length, true);
        } else {
            return _response2.default.reject(input.location(index), false);
        }
    });
}

// string -> Parser string char
function notString(s) {
    return _flowBundle2.default.not(string(s));
}

// unit -> Parser string char
function stringLiteral() {
    var anyChar = string('\\"').or(notChar('"'));
    return char('"').thenRight(anyChar.optrep()).thenLeft(char('"')).map(function (r) {
        return r.join('');
    });
}

// unit -> Parser char char
function charLiteral() {
    var anyChar = string("\\'").or(notChar("'"));
    return char("'").thenRight(anyChar).thenLeft(char("'"));
}

// unit -> Parser char char
function lowerCase() {
    return _flowBundle2.default.satisfy(function (v) {
        return 'a' <= v && v <= 'z';
    });
}

// unit -> Parser char char
function upperCase() {
    return _flowBundle2.default.satisfy(function (v) {
        return 'A' <= v && v <= 'Z';
    });
}

exports.default = {
    utf8Letter: utf8Letter(),
    letter: letter(),
    letters: letters(),
    notChar: notChar,
    char: char,
    charIn: charIn,
    charNotIn: charNotIn,
    subString: subString,
    string: string,
    notString: notString,
    charLiteral: charLiteral(),
    stringLiteral: stringLiteral(),
    lowerCase: lowerCase(),
    upperCase: upperCase()
};
//# sourceMappingURL=chars-bundle.js.map
},{"./flow-bundle":27,"./parser":30,"./response":31}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _unit = require('../data/unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (Stream 'c -> number -> Response 'a 'c) -> Parser 'a 'c
function parse(p) {
    return new _parser2.default(p);
}

// (('b -> Parser 'a 'c) * 'b)-> Parser 'a 'c
/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

function lazy(p, parameters) {
    // equivalent of p(...parameters), but would fail if parameters are undefined
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return p.apply(p.prototype, parameters).parse(input, index);
    });
}

// 'a -> Parser 'a 'c
function returns(v) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _response2.default.accept(v, input, index, false);
    });
}

// unit -> Parser 'a 'c
function error() {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _response2.default.reject(input.location(index), false);
    });
}

// unit -> Parser unit 'c
function eos() {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (input.endOfStream(index)) {
            return _response2.default.accept(_unit2.default, input, index, false);
        } else {
            return _response2.default.reject(input.location(index), false);
        }
    });
}

// ('a -> boolean) -> Parser a 'c
function satisfy(predicate) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return input.get(index).filter(predicate).map(function (value) {
            return _response2.default.accept(value, input, index + 1, true);
        }).lazyRecoverWith(function () {
            return _response2.default.reject(input.location(index), false);
        });
    });
}

// Parser 'a 'c -> Parser 'a 'c
function doTry(p) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return p.parse(input, index).fold(function (accept) {
            return accept;
        }, function (reject) {
            return _response2.default.reject(input.location(reject.offset), false);
        });
    });
}

// unit -> Parser 'a 'c
function any() {
    return satisfy(function () {
        return true;
    });
}

// unit -> Parser 'a 'c
function nop() {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _response2.default.accept([], input, index, true);
    });
}

// Parser 'a ? -> Parser 'a 'a
function not(p) {
    return doTry(p).then(error()).or(any());
}

// int -> Parser (List 'a') a'
function subStream(length) {
    return any().occurrence(length);
}

function sequence() {
    var current = nop();
    for (var v in arguments) {
        current = current.then(arguments[v]);
    }
    return current;
}

exports.default = {
    parse: parse,
    try: doTry,
    any: any(),
    subStream: subStream,
    not: not,
    lazy: lazy,
    returns: returns,
    error: error(),
    eos: eos(),
    satisfy: satisfy,
    sequence: sequence
};
//# sourceMappingURL=flow-bundle.js.map
},{"../data/unit.js":20,"./parser":30,"./response":31}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.N = exports.F = exports.C = undefined;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _flowBundle = require('./flow-bundle');

var _flowBundle2 = _interopRequireDefault(_flowBundle);

var _charsBundle = require('./chars-bundle');

var _charsBundle2 = _interopRequireDefault(_charsBundle);

var _numbersBundle = require('./numbers-bundle');

var _numbersBundle2 = _interopRequireDefault(_numbersBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = exports.C = _charsBundle2.default; /*
                                            * Parsec
                                            * https://github.com/d-plaindoux/parsec
                                            *
                                            * Copyright (c) 2016 Didier Plaindoux
                                            * Licensed under the LGPL2 license.
                                            */

var F = exports.F = _flowBundle2.default;
var N = exports.N = _numbersBundle2.default;

exports.default = { parser: _parser2.default, response: _response2.default };
//# sourceMappingURL=index.js.map
},{"./chars-bundle":26,"./flow-bundle":27,"./numbers-bundle":29,"./parser":30,"./response":31}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _charsBundle = require('./chars-bundle');

var _charsBundle2 = _interopRequireDefault(_charsBundle);

var _flowBundle = require('./flow-bundle');

var _flowBundle2 = _interopRequireDefault(_flowBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unit -> Parser number char
/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

function numberLiteral() {
    // [-+]?\d+([.]\d+)?([eE][+-]?\d+)?
    var join = function join(r) {
        return r.join('');
    },
        joinOrEmpty = function joinOrEmpty(r) {
        return r.map(join).orElse('');
    },
        digits = digit().rep().map(join),
        integer = _charsBundle2.default.charIn('+-').opt().then(digits).map(function (r) {
        return r[0].orElse('') + r[1];
    }),
        float = integer.then(_charsBundle2.default.char('.').then(digits).opt().map(joinOrEmpty)).then(_charsBundle2.default.charIn('eE').then(integer).opt().map(joinOrEmpty)).map(function (r) {
        return r[0] + r[1] + r[2];
    });

    return float.map(function (r) {
        return parseFloat(r, 10);
    });
}

// unit -> Parser char char
function digit() {
    return _flowBundle2.default.satisfy(function (v) {
        return '0' <= v && v <= '9';
    });
}

function digits() {
    return digit().rep().map(function (v) {
        return v.join('');
    });
}

function integer() {
    // [-+]?\d+([.]\d+)?([eE][+-]?\d+)?
    var join = function join(r) {
        return r.join('');
    },
        digits = digit().rep().map(join),
        integer = _charsBundle2.default.charIn('+-').opt().then(digits).map(function (r) {
        return r[0].orElse('') + r[1];
    });

    return integer.map(function (i) {
        return parseInt(i, 10);
    });
}

exports.default = {
    numberLiteral: numberLiteral(),
    digit: digit(),
    digits: digits(),
    integer: integer()
};
//# sourceMappingURL=numbers-bundle.js.map
},{"./chars-bundle":26,"./flow-bundle":27}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/*
 * Parsec: Direct Style Monadic Parser Combinators For The Real World
 *
 * http://research.microsoft.com/en-us/um/people/daan/download/papers/parsec-paper.pdf
 */

var _index = require('../stream/index');

var _index2 = _interopRequireDefault(_index);

var _option = require('../data/option');

var _option2 = _interopRequireDefault(_option);

var _list = require('../data/list');

var _list2 = _interopRequireDefault(_list);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Parser class
 */
var Parser = function () {
    // (Stream 'c -> number -> Response 'a 'c) -> Parser 'a 'c
    function Parser(parse) {
        _classCallCheck(this, Parser);

        this.parse = parse;
    }

    // Parser 'a 'c => ('a -> Parser 'b 'c) -> Parser 'b 'c


    _createClass(Parser, [{
        key: 'flatmap',
        value: function flatmap(f) {
            return bind(this, f);
        }

        // Parser 'a 'c => ('a -> 'b) -> Parser 'b 'c

    }, {
        key: 'map',
        value: function map(f) {
            var self = this;

            return new Parser(function (input) {
                var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                return self.parse(input, index).map(f);
            });
        }

        // Parser 'a 'c => ('a -> boolean) -> Parser 'a 'c

    }, {
        key: 'filter',
        value: function filter(p) {
            var self = this;

            return new Parser(function (input) {
                var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                return self.parse(input, index).filter(p);
            });
        }

        // Parser 'a 'c => Comparable 'a -> Parser 'a 'c

    }, {
        key: 'match',
        value: function match(v) {
            return this.filter(function (a) {
                return a === v;
            });
        }

        // Parser 'a 'c => Parser 'b 'c -> Parser ('a,'b) 'c

    }, {
        key: 'then',
        value: function then(p) {
            return this.flatmap(function (a) {
                return p.map(function (b) {
                    var result = (0, _list2.default)(a).append((0, _list2.default)(b)).array();
                    if (result.length == 1) {
                        return result[0];
                    } else {
                        return result;
                    }
                });
            });
        }
    }, {
        key: 'concat',
        value: function concat(p) {
            return this.then(p);
        }
    }, {
        key: 'drop',
        value: function drop() {
            return this.map(function (item) {
                return [];
            });
        }

        // Parser 'a 'c => Parser 'b 'c -> Parser 'a 'c

    }, {
        key: 'thenLeft',
        value: function thenLeft(p) {
            return this.then(p.drop());
        }

        // Parser 'a 'c => Parser 'b 'c -> Parser 'b 'c

    }, {
        key: 'thenRight',
        value: function thenRight(p) {
            return this.drop().then(p);
        }

        // Parser 'a 'c => 'b -> Parser 'b 'c

    }, {
        key: 'thenReturns',
        value: function thenReturns(v) {
            return this.thenRight(returns(v));
        }

        // Parser 'a 'c -> Parser 'a 'c

    }, {
        key: 'or',
        value: function or(p) {
            return choice(this, p);
        }

        // Parser 'a 'c => unit -> Parser (Option 'a) 'c

    }, {
        key: 'opt',
        value: function opt() {
            return this.map(_option2.default.some).or(returns(_option2.default.none()));
        }

        // Parser 'a 'c => unit -> Parser (List 'a) 'c

    }, {
        key: 'rep',
        value: function rep() {
            return repeatable(this, function () {
                return true;
            }, function (l) {
                return l !== 0;
            });
        }

        // Parser 'a 'c => number -> Parser (List 'a) 'c

    }, {
        key: 'occurrence',
        value: function occurrence(_occurrence) {
            return repeatable(this, function (l) {
                return l < _occurrence;
            }, function (l) {
                return l === _occurrence;
            });
        }

        // Parser 'a 'c => unit -> Parser (List 'a) 'c

    }, {
        key: 'optrep',
        value: function optrep() {
            return repeatable(this, function () {
                return true;
            }, function () {
                return true;
            });
        }

        // Parser 'a 'c => Parser 'b 'a -> Parser 'b 'c

    }, {
        key: 'chain',
        value: function chain(p) {
            var self = this;

            return new Parser(function (input) {
                var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                return p.parse(_index2.default.buffered(_index2.default.ofParser(self, input)), index);
            });
        }

        /**
         * Prints a hint if the parser enters in this step
         * @param hint
         * @returns the equivalent Parser
         */

    }, {
        key: 'debug',
        value: function debug(hint) {
            var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var f = function f(p) {
                if (details) {
                    console.log('[debug] : ', hint, p);
                } else {
                    console.log('[debug] : ', hint);
                }

                return p;
            };
            return this.map(f);
        }
    }]);

    return Parser;
}();

// Response 'a 'c -> ('a -> Parser 'b 'c) -> Response 'b 'c


exports.default = Parser;
function bindAccepted(accept_a, f) {
    return f(accept_a.value).parse(accept_a.input, accept_a.offset).fold(function (accept_b) {
        return _response2.default.accept(accept_b.value, accept_b.input, accept_b.offset, accept_a.consumed || accept_b.consumed);
    }, function (reject_b) {
        return _response2.default.reject(accept_a.input.location(reject_b.offset), accept_a.consumed || reject_b.consumed);
    });
}

// Parser 'a 'c -> ('a -> Parser 'b 'c) -> Parser 'b 'c
function bind(self, f) {
    return new Parser(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return self.parse(input, index).fold(function (accept_a) {
            return bindAccepted(accept_a, f);
        }, function (reject_a) {
            return reject_a;
        });
    });
}

// Parser 'a 'c -> Parser 'a 'c -> Parser 'a 'c
function choice(self, f) {
    return new Parser(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return self.parse(input, index).fold(function (accept) {
            return accept;
        }, function (reject) {
            return reject.consumed ? reject : f.parse(input, index);
        });
    });
}

// Parser 'a 'c -> unit -> Parser (List 'a) 'c
function repeatable(self, occurrences, accept) {
    return new Parser(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var consumed = false,
            value = (0, _list2.default)(),
            offset = index,
            current = self.parse(input, index),
            occurrence = 0;

        while (current.isAccepted() && occurrences(occurrence)) {
            occurrence += 1;
            value = value.append((0, _list2.default)(current.value));
            consumed = consumed || current.consumed;
            offset = current.offset;
            current = self.parse(input, current.offset);
        }

        if (accept(occurrence)) {
            return _response2.default.accept(value, input, offset, consumed);
        }

        return _response2.default.reject(offset, consumed);
    });
}

/*
 * Builders
 */

function returns(v) {
    return new Parser(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _response2.default.accept(v, input, index, false);
    });
}
//# sourceMappingURL=parser.js.map
},{"../data/list":17,"../data/option":18,"../stream/index":45,"./response":31}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _try = require('../data/try.js');

var _try2 = _interopRequireDefault(_try);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Response basic type
 * fold() is an abstract method implemented in Accept and Reject
 */
var Response = function () {
    function Response() {
        _classCallCheck(this, Response);
    }

    _createClass(Response, [{
        key: 'isAccepted',

        // Response 'a 'c => unit -> bool
        value: function isAccepted() {
            return this.fold(function () {
                return true;
            }, function () {
                return false;
            });
        }

        // Response 'a 'c => unit -> bool

    }, {
        key: 'toTry',
        value: function toTry() {
            return this.fold(function (accept) {
                return _try2.default.success(accept.value);
            }, function (reject) {
                return _try2.default.failure(new Error('parser error at ' + reject.offset));
            });
        }
    }]);

    return Response;
}();

/**
 * Reject response class
 */


var Reject = function (_Response) {
    _inherits(Reject, _Response);

    function Reject(offset, consumed) {
        _classCallCheck(this, Reject);

        var _this = _possibleConstructorReturn(this, (Reject.__proto__ || Object.getPrototypeOf(Reject)).call(this));

        _this.offset = offset;
        _this.consumed = consumed;
        return _this;
    }

    // Response 'a 'c => (Accept 'a 'c -> 'a) -> (Reject 'a 'c -> 'a) -> 'a


    _createClass(Reject, [{
        key: 'fold',
        value: function fold(_, reject) {
            return reject(this);
        }

        // Response 'a 'c => ('a -> 'b) -> Response 'b 'c

    }, {
        key: 'map',
        value: function map() {
            return this;
        }

        // Response 'a 'c => ('a -> Response 'b 'c) -> Response 'b 'c

    }, {
        key: 'flatmap',
        value: function flatmap() {
            return this;
        }

        // Response 'a 'c => ('a -> bool) -> Response 'b 'c

    }, {
        key: 'filter',
        value: function filter() {
            return new Reject(this.offset, false);
        }
    }]);

    return Reject;
}(Response);

/**
 * Accept response class
 */


var Accept = function (_Response2) {
    _inherits(Accept, _Response2);

    function Accept(value, input, offset, consumed) {
        _classCallCheck(this, Accept);

        var _this2 = _possibleConstructorReturn(this, (Accept.__proto__ || Object.getPrototypeOf(Accept)).call(this));

        _this2.offset = offset;
        _this2.consumed = consumed;
        _this2.value = value;
        _this2.input = input;
        return _this2;
    }

    // Response 'a 'c => (Accept 'a 'c -> 'a) -> (Reject 'a 'c -> 'a) -> 'a


    _createClass(Accept, [{
        key: 'fold',
        value: function fold(accept) {
            return accept(this);
        }

        // Response 'a 'c => ('a -> 'b) -> Response 'b 'c

    }, {
        key: 'map',
        value: function map(callback) {
            return new Accept(callback(this.value), this.input, this.offset, this.consumed);
        }

        // Response 'a 'c => ('a -> Response 'b 'c) -> Response 'b 'c

    }, {
        key: 'flatmap',
        value: function flatmap(callback) {
            return callback(this.value);
        }

        // Response 'a 'c => ('a -> bool) -> Response 'b 'c

    }, {
        key: 'filter',
        value: function filter(predicate) {
            if (predicate(this.value)) {
                return this;
            } else {
                return new Reject(this.offset, false);
            }
        }
    }]);

    return Accept;
}(Response);

/**
 * Constructors
 */


var accept = function accept(value, sequence, offset, consumed) {
    return new Accept(value, sequence, offset, consumed);
};
var reject = function reject(offset, consumed) {
    return new Reject(offset, consumed);
};
var response = { accept: accept, reject: reject };

exports.default = response;
//# sourceMappingURL=response.js.map
},{"../data/try.js":19}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../index');

var _response = require('./../../parsec/response');

var _response2 = _interopRequireDefault(_response);

var _parser = require('./../../parsec/parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by nicorama on 10/01/2017.
 */

var ExtractorBundle = function () {
    function ExtractorBundle(options) {
        _classCallCheck(this, ExtractorBundle);

        this.options = {
            spacesCharacters: ' \t\n',
            wordSeparators: _index.C.charIn(' \n:-,;'),
            letter: _index.C.letter,
            moreSeparators: null
        };

        Object.assign(this.options, this._handleOptions(options));

        this.last = _last;
        this.first = _first;
    }

    _createClass(ExtractorBundle, [{
        key: '_handleOptions',
        value: function _handleOptions(options) {
            if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                if (options.moreSeparators) {
                    if (options.wordSeparators) {
                        console.warn('Parsec WARNING: You cannot set both options ' + 'wordSeparators & options.moreSeparator ; moreSeparator is ignored');
                        delete options.moreSeparator;
                    } else {
                        options.wordSeparators = _index.C.charIn(' \n:-,;' + options.moreSeparators);
                    }
                }
                return options;
            } else {
                return {};
            }
        }
    }, {
        key: 'spaces',
        value: function spaces() {
            return _index.C.charIn(this.options.spacesCharacters).rep().map(function (spaces) {
                return spaces.join('');
            });
        }

        // returns a types number

    }, {
        key: 'number',
        value: function number() {
            return _index.N.digit.rep().map(function (v) {
                return parseInt(v.join(''));
            });
        }

        // returns a string representing numbers

    }, {
        key: 'digits',
        value: function digits() {
            return _index.N.digit.rep().map(function (v) {
                return v.join('');
            });
        }
    }, {
        key: 'word',
        value: function word() {
            return this.options.letter.rep().map(function (v) {
                return v.join('');
            });
        }
    }, {
        key: '_wordSeparators',
        value: function _wordSeparators() {
            //TODO : replace second element by moreSeparators
            return this.spaces().or(this.options.wordSeparators);
        }
    }, {
        key: 'words',
        value: function words() {
            var keepSpaces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (keepSpaces) {
                return _index.F.try(this.word().or(this._wordSeparators())).rep().map(function (item) {
                    return item.array();
                });
            } else {
                var parser = _index.F.try(this._wordSeparators().optrep().thenRight(this.word()));
                return parser.rep().thenLeft(this._wordSeparators().optrep()).map(function (item) {
                    return item.array();
                });
            }
        }
    }, {
        key: 'wordsIn',
        value: function wordsIn(array) {
            var keepSpaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (keepSpaces) {
                return _index.F.try(this.stringIn(array).or(this._wordSeparators())).rep().map(function (item) {
                    return item.array();
                });
            } else {
                var parser = _index.F.try(this._wordSeparators().optrep().thenRight(this.stringIn(array)));
                return parser.rep().thenLeft(this._wordSeparators().optrep()).map(function (item) {
                    return item.array();
                });
            }
        }
    }, {
        key: 'stringIn',
        value: function stringIn(array) {
            var tryString = function tryString(s) {
                return _index.F.try(_index.C.string(s));
            };

            if (array.length === 0) {
                return tryString('').thenReturns(undefined);
            }
            if (array.length === 1) {
                // TODO : use tryString
                return _index.F.try(_index.C.string(array[0]));
            }

            // TODO: Comment reduce use
            var initial = tryString(array[0]);
            var workArray = array.slice(1);
            return workArray.reduce(function (accu, next) {
                return accu.or(tryString(next));
            }, initial);
        }
    }, {
        key: '_wordSequence',
        value: function _wordSequence(stop) {
            return _index.F.not(stop);
        }
    }, {
        key: 'wordsUntil',
        value: function wordsUntil(stop) {
            if (typeof stop === 'string') {
                return satisfyStringFast(stop);
            }

            if (Array.isArray(stop)) {
                return satisfyArrayStringFast(stop);
            }

            return _index.F.try(this._wordSequence(stop).rep().then(_index.F.eos).thenReturns(undefined)).or(this._wordSequence(stop).rep().map(function (chars) {
                return chars.join('');
            })).filter(function (v) {
                return v !== undefined;
            });
        }
    }]);

    return ExtractorBundle;
}();

exports.default = ExtractorBundle;


function _last(values) {
    return values[values.length - 1];
}

function _first(values) {
    return values[0];
}

/**
 * Will work only if input.source is a String
 * @param string
 * @returns {Parser}
 */
function satisfyStringFast(string) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (typeof input.source !== 'string') {
            throw 'Input source must be a String';
        }

        var sourceIndex = input.source.indexOf(string, index);
        if (sourceIndex > 0) {
            return _response2.default.accept(input.source.substring(index, sourceIndex), input, sourceIndex, true);
        } else {
            return _response2.default.reject(input.location(index), false);
        }
    });
}

/**
 * Will work only if input.source is a String
 * Needs to be tested with ReactJS
 * @param string
 * @returns {Parser}
 */
function satisfyArrayStringFast(array) {
    return new _parser2.default(function (input) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (typeof input.source !== 'string') {
            throw 'Input source must be a String';
        }

        var sourceIndex = -1;

        var i = 0;
        while (sourceIndex < 0 && i < array.length) {
            var needle = array[i];
            sourceIndex = input.source.indexOf(needle, index);
            i++;
            if (sourceIndex > 0) {
                break;
            }
        }

        //const sourceIndex = input.source.indexOf(string, index)

        if (sourceIndex > 0) {
            return _response2.default.accept(input.source.substring(index, sourceIndex), input, sourceIndex, true);
        } else {
            return _response2.default.reject(input.location(index), false);
        }
    });
}
//# sourceMappingURL=extractor-bundle.js.map
},{"../../index":25,"./../../parsec/parser":30,"./../../parsec/response":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonparser = require('./json/jsonparser');

var _jsonparser2 = _interopRequireDefault(_jsonparser);

var _markdownParser = require('./markdown/markdown-parser');

var _markdownParser2 = _interopRequireDefault(_markdownParser);

var _markdownBundle = require('./markdown/markdown-bundle');

var _markdownBundle2 = _interopRequireDefault(_markdownBundle);

var _extractorBundle = require('./extractor/extractor-bundle');

var _extractorBundle2 = _interopRequireDefault(_extractorBundle);

var _tokenBundle = require('./token-bundle');

var _tokenBundle2 = _interopRequireDefault(_tokenBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  jsonParser: _jsonparser2.default,
  markdownDocument: _markdownParser2.default,
  markdownBundle: _markdownBundle2.default,
  extractorBundle: _extractorBundle2.default,
  tokenBundle: _tokenBundle2.default
}; /*
    * Parsec
    * https://github.com/d-plaindoux/parsec
    *
    * Copyright (c) 2016 Didier Plaindoux
    * Licensed under the LGPL2 license.
    */
//# sourceMappingURL=index.js.map
},{"./extractor/extractor-bundle":32,"./json/jsonparser":34,"./markdown/markdown-bundle":37,"./markdown/markdown-parser":38,"./token-bundle":42}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _genlex = require('../../genlex/genlex.js');

var _genlex2 = _interopRequireDefault(_genlex);

var _token = require('../../genlex/token');

var _token2 = _interopRequireDefault(_token);

var _index = require('../../parsec/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Facilities
//

var tkNumber = _token2.default.parser.number,
    tkString = _token2.default.parser.string,
    tkKeyword = _token2.default.parser.keyword; /*
                                                 * Parsec
                                                 * https://github.com/d-plaindoux/parsec
                                                 *
                                                 * Copyright (c) 2016 Didier Plaindoux
                                                 * Licensed under the LGPL2 license.
                                                 */

function tkKey(s) {
    return tkKeyword.match(s);
}

// unit -> Parser ? Token
function arrayOrNothing() {
    var value = [],
        addValue = function addValue(e) {
        value = value.concat(e);
    },
        getValue = function getValue() {
        return value;
    },
        item = _index.F.lazy(expr).map(addValue);
    return item.then(tkKey(',').thenRight(item).optrep()).opt().map(getValue);
}

// unit -> Parser ? Token
function objectOrNothing() {
    var value = {},
        addValue = function addValue(e) {
        value[e[0]] = e[1];
    },
        getValue = function getValue() {
        return value;
    },
        attribute = tkString.thenLeft(tkKey(':')).then(_index.F.lazy(expr)).map(addValue);
    return attribute.thenLeft(tkKey(',').then(attribute).optrep()).opt().map(getValue);
}

// unit -> Parser ? Token
function expr() {
    return tkNumber.or(tkString).or(tkKey('null').thenReturns(null)).or(tkKey('true').thenReturns(true)).or(tkKey('false').thenReturns(false)).or(tkKey('[').thenRight(_index.F.lazy(arrayOrNothing)).thenLeft(tkKey(']'))).or(tkKey('{').thenRight(_index.F.lazy(objectOrNothing)).thenLeft(tkKey('}')));
}

//const parse =
exports.default = {
    parse: function parse(source) {
        var keywords = ['null', 'false', 'true', '{', '}', '[', ']', ':', ','],
            tokenizer = _genlex2.default.generator(keywords).tokenBetweenSpaces(_token2.default.builder);

        return tokenizer.chain(expr().thenLeft(_index.F.eos)).parse(source, 0);
    }
};
//# sourceMappingURL=jsonparser.js.map
},{"../../genlex/genlex.js":21,"../../genlex/token":23,"../../parsec/index":28}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../parsec/index');

var _index2 = require('../../stream/index');

var _index3 = _interopRequireDefault(_index2);

var _textParser = require('./text-parser');

var _textParser2 = _interopRequireDefault(_textParser);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Simon on 24/12/2016.
 */

function stop() {
    return _index.F.eos.or(_index.C.charIn('\r\n*`'));
}

function pureText() {
    return _index.F.not(stop()).rep().map(function (chars) {
        return chars.join('');
    });
}

function formattedSequence() {
    return _textParser2.default.formattedSequence(pureText(), stop());
}

function bulletLv1() {
    return _index.C.char('\n').optrep().then(_index.C.charIn('*-')) //first character of a bullet is  * or -
    .then(_index.C.charIn(' \xA0')) // second character of a bullet is space or non-breakable space
    .thenRight(formattedSequence()).map(function (someText) {
        return { bullet: { level: 1, content: someText.array() } };
    });
}

function bulletLv2() {
    return _index.C.char('\n').optrep().then(_token2.default.fourSpacesBlock()).then(_index.C.char(' ').optrep()) //careful. This will accept 8 space. therefore the code-parser must have higher priority
    .then(_index.C.charIn('*-')) //first character of a bullet is  * or -
    .then(_index.C.charIn(' \xA0')) // second character of a bullet is space or non-breakable space
    .thenRight(formattedSequence()).map(function (someText) {
        return { bullet: { level: 2, content: someText.array() } };
    });
}

function bullet() {
    return _index.F.try(bulletLv2()).or(bulletLv1());
}

function parseBullet(line) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return bullet().parse(_index3.default.ofString(line), offset);
}

exports.default = {
    bulletLv1: bulletLv1,
    bulletLv2: bulletLv2,
    bullet: bullet,

    parse: function parse(line) {
        return parseBullet(line, 0);
    }
};
//# sourceMappingURL=bullet-parser.js.map
},{"../../parsec/index":28,"../../stream/index":45,"./text-parser":39,"./token":41}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../parsec/index');

var _index2 = require('../../stream/index');

var _index3 = _interopRequireDefault(_index2);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* TODO mix spaces &  tab bug  "  \t  " will not be accepted
 known issue: non-breakable spaces are not recognised
  */
function codeLine() {
    return _index.C.char('\n').optrep().thenRight(_token2.default.fourSpacesBlock()).thenRight(_token2.default.fourSpacesBlock()).thenRight(_token2.default.rawTextUntilChar('\n', true)).map(function (text) {
        return { code: text };
    });
} /**
   * Created by Simon on 03/01/2017.
   */

function parseCodeLine(line) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return codeLine().parse(_index3.default.ofString(line), offset);
}

exports.default = {
    codeLine: codeLine,

    parse: function parse(line) {
        return parseCodeLine(line, 0);
    }
};
//# sourceMappingURL=code-line-parser.js.map
},{"../../parsec/index":28,"../../stream/index":45,"./token":41}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _textParser = require('./text-parser');

var _textParser2 = _interopRequireDefault(_textParser);

var _titleParser = require('./title-parser');

var _titleParser2 = _interopRequireDefault(_titleParser);

var _bulletParser = require('./bullet-parser');

var _bulletParser2 = _interopRequireDefault(_bulletParser);

var _codeLineParser = require('./code-line-parser');

var _codeLineParser2 = _interopRequireDefault(_codeLineParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    blank: _token2.default.blank,
    rawTextUntilChar: _token2.default.rawTextUntilChar,
    eol: _token2.default.eol,
    lineFeed: _token2.default.lineFeed,
    fourSpacesBlock: _token2.default.fourSpacesBlock,
    stop: _textParser2.default.stop,
    pureText: _textParser2.default.pureText,
    italic: _textParser2.default.italic,
    bold: _textParser2.default.bold,
    code: _textParser2.default.code,
    text: _textParser2.default.text,
    formattedSequence: _textParser2.default.formattedSequence,
    formattedParagraph: _textParser2.default.formattedParagraph,
    titleLine: _titleParser2.default.titleLine,
    titleSharp: _titleParser2.default.titleSharp,
    title: _titleParser2.default.title,
    bulletLv1: _bulletParser2.default.bulletLv1,
    bulletLv2: _bulletParser2.default.bulletLv2,
    bullet: _bulletParser2.default.bullet,
    codeLine: _codeLineParser2.default.codeLine
};
//# sourceMappingURL=markdown-bundle.js.map
},{"./bullet-parser":35,"./code-line-parser":36,"./text-parser":39,"./title-parser":40,"./token":41}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../parsec/index');

var _index2 = require('../../stream/index');

var _index3 = _interopRequireDefault(_index2);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _textParser = require('./text-parser');

var _textParser2 = _interopRequireDefault(_textParser);

var _titleParser = require('./title-parser');

var _titleParser2 = _interopRequireDefault(_titleParser);

var _bulletParser = require('./bullet-parser');

var _bulletParser2 = _interopRequireDefault(_bulletParser);

var _codeLineParser = require('./code-line-parser');

var _codeLineParser2 = _interopRequireDefault(_codeLineParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mdLine() {
    return _index.F.try(_titleParser2.default.title()).or(_index.F.try(_codeLineParser2.default.codeLine())).or(_index.F.try(_bulletParser2.default.bullet())).or(_index.F.try(_textParser2.default.formattedParagraph())).or(_token2.default.lineFeed());
} /**
   * Created by Simon on 16/12/2016.
   */

function document() {
    return mdLine().rep().map(function (item) {
        return item.array();
    });
}

function _parseLine(line) {
    return mdLine().parse(_index3.default.ofString(line), 0);
}

exports.default = {
    mdLine: mdLine,

    parseLine: function parseLine(line) {
        return _parseLine(line, 0);
    },
    parse: function parse(stream, offset) {
        return document().parse(stream, offset);
    }
};
//# sourceMappingURL=markdown-parser.js.map
},{"../../parsec/index":28,"../../stream/index":45,"./bullet-parser":35,"./code-line-parser":36,"./text-parser":39,"./title-parser":40,"./token":41}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by Simon on 14/12/2016.
                                                                                                                                                                                                                                                                               */

/**
 * This parse a text paragraph
 * text can be "simple" text; bold, italic or a mix (sequence) of those
 * a paragraph ends with a blank line("\n\n" or "\n  \t  \n") or "end of stream" (F.eos())
 */


var _index = require('../../parsec/index');

var _index2 = require('../../stream/index');

var _index3 = _interopRequireDefault(_index2);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function trimStartingLineFeed(str) {
    return str.replace(/^[\s]*/, '');
}

function trimEndingLineFeed(str) {
    return str.replace(/[\s]*$/, '');
}

function stop() {
    return _index.F.eos.or(_token2.default.lineFeed()).or(_index.C.charIn('*`'));
}

function pureText() {
    return _index.F.not(stop()).rep() //  ['a','\n','b'] -> 'a b'
    // But on Windows, we will ignore the \r
    // inside line break will be put as space, but we clear initial or final \n
    .map(function (chars) {
        var allChars = chars.join('');
        return allChars.replace(/\n/g, ' ').replace(/\r/g, '');
    });
}

function italic(pureTextParser) {
    return _index.C.char('*').thenRight(pureTextParser).thenLeft(_index.C.char('*')).map(function (string) {
        return { italic: string };
    });
}

function bold(pureTextParser) {
    return _index.C.string('**').thenRight(pureTextParser).thenLeft(_index.C.string('**')).map(function (string) {
        return { bold: string };
    });
}

function code(pureTextParser) {
    return _index.C.char('`').thenRight(pureTextParser).thenLeft(_index.C.char('`')).map(function (string) {
        return { code: string };
    });
}

function text(pureTextParser) {
    return pureTextParser.map(function (string) {
        return { text: string };
    });
}

/**
 * @param pureTextParser : defines if a text accept some chars or not
 * @param stopParser : defines if text stops at the end of line
 * @returns Parser
 */
function formattedSequence(pureTextParser, stopParser) {
    return bold(pureTextParser).or(italic(pureTextParser)).or(text(pureTextParser)).or(code(pureTextParser)).rep().thenLeft(stopParser);
}

function formattedParagraph() {
    return _token2.default.blank().thenRight(formattedSequence(pureText(), stop())).map(function (list) {
        var array = list.array();
        // We trim the first and last element of the paragraph
        if (array.length > 0 && _typeof(array[0]) === 'object' && array[0].text) {
            array[0].text = trimStartingLineFeed(array[0].text);
            var last = array.length - 1;
            array[last].text = trimEndingLineFeed(array[last].text);
        }

        return { paragraph: array };
    });
}

function parseText(line) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return formattedParagraph().parse(_index3.default.ofString(line), offset);
}

exports.default = {
    stop: stop,
    pureText: pureText,
    italic: italic,
    bold: bold,
    code: code,
    text: text,
    formattedSequence: formattedSequence,
    formattedParagraph: formattedParagraph,
    parse: function parse(line) {
        return parseText(line, 0);
    }
};
//# sourceMappingURL=text-parser.js.map
},{"../../parsec/index":28,"../../stream/index":45,"./token":41}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../parsec/index');

var _index2 = require('../../stream/index');

var _index3 = _interopRequireDefault(_index2);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sharps() {
    return _index.C.char('#').rep().map(function (string) {
        return string.array().length;
    });
}

// a white is a sequence of at least one space, tab or non-breakable space
/**
 * Created by Simon on 14/12/2016.
 */
/*
 * This module try parse a title. The folowing will be recognised as titles:
 * "#foo\n"  "##foo\n"  "foo\n==="  "foo\n---"  "##########     foo     \n"
 *
 * Limits and axiomes
 * A \n in the markdown source ends the parsing of a title.  #foo\nbar  -> {title:foo},{text:bar}
 */
function white() {
    return _index.C.charIn(' \t\xA0').rep();
}

function equals() {
    return _index.C.string('===').then(_token2.default.rawTextUntil(_token2.default.eol())).then(_token2.default.eol()).thenReturns(1); // this mean a level 1 title
}

function minuses() {
    return _index.C.string('---').then(_token2.default.rawTextUntil(_token2.default.eol())).then(_token2.default.eol()).thenReturns(2); // this mean a level 2 title
}

function titleSharp() {
    return sharps().thenLeft(white()).then(_token2.default.rawTextUntil(_token2.default.eol())).thenLeft(_token2.default.eol().or(_index.F.eos)).map(function (array) {
        return {
            title: {
                level: array[0],
                text: array[1]
            }
        };
    });
}

function titleLine() {
    return _token2.default.blank().thenRight(_token2.default.rawTextUntilChar('\r\n').thenLeft(_token2.default.eol()).then(equals().or(minuses())).map(function (array) {
        return {
            title: {
                level: array[1],
                text: array[0]
            }
        };
    }));
}

function title() {
    return titleSharp().or(titleLine());
}

function parseTitle(line) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return title().parse(_index3.default.ofString(line), offset);
}

exports.default = {
    titleLine: titleLine,
    titleSharp: titleSharp,
    title: title,
    parse: function parse(line) {
        return parseTitle(line, 0);
    }
};

/*  SHORTCOMINGS :
* Can not have formatted text in a title.  "##2*3*4 = 24\n" will display "2*3*4 = 24"
 */
//# sourceMappingURL=title-parser.js.map
},{"../../parsec/index":28,"../../stream/index":45,"./token":41}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../parsec/index');

// resolve meanningles characters as an empty string
// also accept an empty string
function blank() {
    return _index.C.charIn(' \t').optrep().thenReturns('');
}

//todo: escape characters
function rawTextUntilChar(charList) {
    var allowVoid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (allowVoid) {
        return _index.C.charNotIn(charList).optrep().map(function (chars) {
            return chars.join('');
        });
    } else {
        return _index.C.charNotIn(charList).rep().map(function (chars) {
            return chars.join('');
        });
    }
}

function rawTextUntil(stop) {
    return _index.F.not(stop).rep().map(function (chars) {
        return chars.join('');
    });
}

function eol() {
    return _index.C.char('\n').or(_index.C.string('\r\n'));
}

//A blank line in the code(that is 2 consecutive \n) is a single end of line (lineFeed) in the rendition
function lineFeed() {
    return eol().then(blank()).then(eol()).thenReturns({
        linefeed: undefined
    });
}

//accept 1 tab or 4 spaces. Space may be unbreakable
function fourSpacesBlock() {
    return _index.C.char('\t').or(_index.C.charIn(' \xA0').occurrence(4));
}

exports.default = {
    blank: blank,
    rawTextUntilChar: rawTextUntilChar,
    rawTextUntil: rawTextUntil,
    eol: eol,
    lineFeed: lineFeed,
    fourSpacesBlock: fourSpacesBlock
};
//# sourceMappingURL=token.js.map
},{"../../parsec/index":28}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../parsec/index');

function _inQuote() {
    return _index.C.char('"').then(_index.C.notChar('"').rep().map(function (item) {
        return item.array();
    })).then(_index.C.char('"'));
}

// accept simon@gmail.com, but also  simon"le gr@nd"@gmail.com
function email() {
    var illegalCharSet1 = ' @\xA0\n\t';
    var illegalCharSet2 = ' @\xA0\n\t.';

    return _inQuote().or(_index.C.charNotIn(illegalCharSet1)).rep().map(function (item) {
        return item.array();
    }) // this mean:   repeat(inQuote or anyCharacter)
    .then(_index.C.char('@')).then(_index.C.charNotIn(illegalCharSet2).rep().map(function (item) {
        return item.array();
    })).then(_index.C.char('.')).then(_index.C.charNotIn(illegalCharSet2).rep().map(function (item) {
        return item.array();
    })).map(function (characters) {
        return { email: characters.join('') };
    });
}

function date() {
    return _index.N.digits.then(_index.C.charIn('-/').thenReturns('-')).then(_index.N.digits).then(_index.C.charIn('-/').thenReturns('-')).then(_index.N.digits).map(function (dateValues) {
        return dateValues[4] > 2000 ? dateValues.reverse() : dateValues;
    }).map(function (dateArray) {
        return dateArray.join('');
    });
}

function blank() {
    var charsOrParser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' \t';

    if (typeof charsOrParser === 'string') {
        return _index.C.charIn(charsOrParser).optrep().thenReturns('');
    } else {
        return charsOrParser.optrep().thenReturns('');
    }
}

function eol() {
    return _index.C.char('\n').or(_index.C.string('\r\n'));
}

exports.default = {
    email: email,
    date: date,
    blank: blank,
    eol: eol()
};
//# sourceMappingURL=token-bundle.js.map
},{"../parsec/index":28}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Array stream class
 */
var ArrayStream = function (_Stream) {
    _inherits(ArrayStream, _Stream);

    function ArrayStream(source) {
        _classCallCheck(this, ArrayStream);

        var _this = _possibleConstructorReturn(this, (ArrayStream.__proto__ || Object.getPrototypeOf(ArrayStream)).call(this));

        _this.source = source;
        return _this;
    }

    // ArrayStream 'a => unit -> boolean


    _createClass(ArrayStream, [{
        key: 'endOfStream',
        value: function endOfStream(index) {
            return this.source.length <= index;
        }

        // ArrayStream 'a => number -> 'a <+> error

    }, {
        key: 'unsafeGet',
        value: function unsafeGet(index) {
            return this.source[index];
        }
    }]);

    return ArrayStream;
}(_stream2.default);

function factory(source) {
    return new ArrayStream(source);
}

exports.default = factory;
//# sourceMappingURL=arraystream.js.map
},{"./stream":47}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Buffered stream class
 */
var BufferedStream = function (_Stream) {
    _inherits(BufferedStream, _Stream);

    function BufferedStream(source) {
        _classCallCheck(this, BufferedStream);

        var _this = _possibleConstructorReturn(this, (BufferedStream.__proto__ || Object.getPrototypeOf(BufferedStream)).call(this));

        _this.source = source;
        _this.cache = {};
        return _this;
    }

    _createClass(BufferedStream, [{
        key: 'location',
        value: function location(index) {
            return this.source.location(index);
        }

        // BufferedStream 'a => unit -> boolean

    }, {
        key: 'endOfStream',
        value: function endOfStream(index) {
            return this.source.endOfStream(index);
        }

        // override, BufferedStream 'a => number -> Try 'a

    }, {
        key: 'get',
        value: function get(index) {
            var self = this;

            if (!self.cache[index]) {
                self.cache[index] = self.source.get(index);
            }

            return self.cache[index];
        }
    }]);

    return BufferedStream;
}(_stream2.default);

function factory(source) {
    return new BufferedStream(source);
}

exports.default = factory;
//# sourceMappingURL=bufferedstream.js.map
},{"./stream":47}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringstream = require('./stringstream');

var _stringstream2 = _interopRequireDefault(_stringstream);

var _arraystream = require('./arraystream');

var _arraystream2 = _interopRequireDefault(_arraystream);

var _parserstream = require('./parserstream');

var _parserstream2 = _interopRequireDefault(_parserstream);

var _bufferedstream = require('./bufferedstream');

var _bufferedstream2 = _interopRequireDefault(_bufferedstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Parsec
 * https://github.com/d-plaindoux/parsec
 *
 * Copyright (c) 2016 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

exports.default = {
  ofString: _stringstream2.default,
  ofArray: _arraystream2.default,
  ofParser: _parserstream2.default,
  buffered: _bufferedstream2.default
};
//# sourceMappingURL=index.js.map
},{"./arraystream":43,"./bufferedstream":44,"./parserstream":46,"./stringstream":48}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * ParserStream stream class
 */
var ParserStream = function (_Stream) {
    _inherits(ParserStream, _Stream);

    function ParserStream(parser, source) {
        _classCallCheck(this, ParserStream);

        var _this = _possibleConstructorReturn(this, (ParserStream.__proto__ || Object.getPrototypeOf(ParserStream)).call(this));

        _this.source = parser;
        _this.input = source;
        _this.offsets = {};
        return _this;
    }

    _createClass(ParserStream, [{
        key: 'getOffset',
        value: function getOffset(index) {
            return this.offsets[index] || index;
        }

        // Stream 'a => number -> number

    }, {
        key: 'location',
        value: function location(index) {
            return this.input.location(this.getOffset(index - 1) + 1);
        }

        // ParserStream 'a => unit -> boolean

    }, {
        key: 'endOfStream',
        value: function endOfStream(index) {
            return this.input.endOfStream(this.getOffset(index));
        }

        // ParserStream 'a => number -> 'a <+> error

    }, {
        key: 'unsafeGet',
        value: function unsafeGet(index) {
            var result = this.source.parse(this.input, this.getOffset(index));

            if (result.isAccepted()) {
                this.offsets[index + 1] = result.offset;
                return result.value;
            } else {
                throw new Error();
            }
        }
    }]);

    return ParserStream;
}(_stream2.default);

function factory(parser, source) {
    return new ParserStream(parser, source);
}

exports.default = factory;
//# sourceMappingURL=parserstream.js.map
},{"./stream":47}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _try = require('../data/try');

var _try2 = _interopRequireDefault(_try);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stream = function () {
    function Stream() {
        _classCallCheck(this, Stream);
    }

    // Stream 'a => number -> number


    _createClass(Stream, [{
        key: 'location',
        value: function location(index) {
            return index;
        }

        // Stream 'a => number -> Try 'a

    }, {
        key: 'get',
        value: function get(index) {
            try {
                if (this.endOfStream(index)) {
                    return _try2.default.failure(new Error('End of stream reached'));
                } else {
                    return _try2.default.success(this.unsafeGet(index));
                }
            } catch (e) {
                return _try2.default.failure(e);
            }
        }

        // Stream 'a => [Comparable 'a] -> number -> boolean

    }, {
        key: 'subStreamAt',
        value: function subStreamAt(s, index) {
            for (var i = 0; i < s.length; i++) {
                var value = this.get(i + index);
                if (!value.isSuccess() || value.success() !== s[i]) {
                    return false;
                }
            }

            return true;
        }
    }]);

    return Stream;
}();

exports.default = Stream;
//# sourceMappingURL=stream.js.map
},{"../data/try":19}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/d-plaindoux/parsec
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 Didier Plaindoux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the LGPL2 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * String stream class
 */
var StringStream = function (_Stream) {
    _inherits(StringStream, _Stream);

    function StringStream(source) {
        _classCallCheck(this, StringStream);

        var _this = _possibleConstructorReturn(this, (StringStream.__proto__ || Object.getPrototypeOf(StringStream)).call(this));

        _this.source = source;
        return _this;
    }

    // StringStream 'a => unit -> boolean


    _createClass(StringStream, [{
        key: 'endOfStream',
        value: function endOfStream(index) {
            return this.source.length <= index;
        }

        // StringStream 'a => number -> 'a <+> error

    }, {
        key: 'unsafeGet',
        value: function unsafeGet(index) {
            return this.source.charAt(index);
        }
    }]);

    return StringStream;
}(_stream2.default);

function factory(source) {
    return new StringStream(source);
}

exports.default = factory;
//# sourceMappingURL=stringstream.js.map
},{"./stream":47}]},{},[2]);
