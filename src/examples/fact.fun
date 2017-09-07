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
