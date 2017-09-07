# fun.js

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## Grammar

```
s0 ::=
   definition*

definition ::=
   "def" IDENT Exp
   Exp

Exp ::=
   SExp+    	       	   

SExp ::=
   { ((DENT+ "->")? SExp } 	         
   "(" Exp ")"
   "(" ")"
   "$ Exp
   NUMBER
   STRING
   "native" STRING
```

## Example

```
def leq   { l r t f -> native "equal" }
def mult  { l r     -> native "mult"  }
def minus { l r     -> native "minus" }

def cond { c t f -> c t f () }

def fact { a ->
    cond (leq a 1)
         { 1 }
         { mult a $ fact $ minus a 1 }
}         

fact 12
```

## License

Copyright (C)2017 D. Plaindoux.

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
