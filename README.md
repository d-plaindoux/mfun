# F&micro;N

[![Build Status](https://travis-ci.org/d-plaindoux/mfun.svg)](https://travis-ci.org/d-plaindoux/mfun)
[![Coverage Status](https://coveralls.io/repos/d-plaindoux/mfun/badge.png?branch=master)](https://coveralls.io/r/d-plaindoux/mfun?branch=master)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## Introduction

[Slides](http://d.plaindoux.free.fr/talks/lambdalille/mfun/index.html#/)

F&micro;N is a micro functional language designed for compilation explanation purpose equiped with primitive data and a naive Javascript interoperability.

## Grammar

```
Id  ::= [a-zA-Z_][a-zA-Z0-9_$?]*
exp ::= Id                            -- Identifier
      | Number                        -- Float literal e.g. -1.3e2
      | String                        -- String literal e.g. "o_O"
      | "native" String               -- Native binding
      | '(' ')'                       -- Unit
      | '(' exp+ ')'                  -- Block of application
      | '$' exp+                      -- Infix application
      | '{' (Id+ "->")? exp+ '}'      -- Abstraction à la Kotlin
      | "let" Id '=' exp+ "in" exp+   -- Binding
def ::= "let" Id '=' exp+
s0  ::= def* 
```

## Example

```
let leq   { l r t f -> native "leq"   }
let mult  { l r     -> native "mult"  }
let minus { l r     -> native "minus" }

let cond { c t f -> c t f () }

let fact { a ->
    cond (leq a 1)
         { 1 }
         { mult a $ fact $ minus a 1 }
}         

let _ = fact 12
```

## License

Copyright (C)2019-2020 D. Plaindoux.

This program is  free software; you can redistribute  it and/or modify
it  under the  terms  of  the GNU  Lesser  General  Public License  as
published by  the Free Software  Foundation; either version 2,  or (at
your option) any later version.

This program  is distributed in the  hope that it will  be useful, but
WITHOUT   ANY  WARRANTY;   without  even   the  implied   warranty  of
MERCHANTABILITY  or FITNESS  FOR  A PARTICULAR  PURPOSE.  See the  GNU
Lesser General Public License for more details.

You  should have  received a  copy of  the GNU  Lesser General  Public
License along with  this program; see the file COPYING.  If not, write
to the  Free Software Foundation,  675 Mass Ave, Cambridge,  MA 02139,
USA.
