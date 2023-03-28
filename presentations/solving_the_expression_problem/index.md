---
theme: eloc
title: Solving The Expression Problem
---

# The Expression Problem

Stefano Candori

---

## Program = `data` + `operations`

---

## Data & Operations should be `extensible`!

---

## The Expression (`Extension`) problem

---

## Extensibility

1. Code-level `modularization` (don't modify existing code)
2. Static `type safety`
3. (Separate `compilation`)

---

## `Open` for extension, `Closed` for modification

---

## A simple grammar

```
Exp ::= Val | Add
Val ::= non-negative integer
Add ::= Exp ‘+’ Exp
```

And a set of operations on it (`pretty print`, `eval`, etc...)

---

## OO take

```csharp
public abstract class Expr{
    public abstract string PrettyPrint();
}

public abstract class Val: Expr{
    public int val;
    public override string PrettyPrint(){
        return val.toString();
    }
}

public abstract class Add: Expr{
    public Expr lhs, rhs;
    public override string PrettyPrint(){
        return lhs.toString() + " + " + rhs.toString()
    }
}
```

---

## OO take

```csharp
public abstract class Neg: Expr{
    public Expr operand;
    public override string PrettyPrint(){
        return " - " + operand.toString();
    }
}

```

We can easily add new datatypes <uim-rocket class="text-purple-400"/>

---

## OO take


```csharp{3}
public abstract class Expr{
    public abstract string PrettyPrint();
    public abstract int Eval();
}
```

But it's difficult to add new operations!
We need to `edit` the existing code <mdi-skull-crossbones-outline class="text-red-400"/>

---

## OO take

![](/expr-problem-oop.png)

---

## FP take

```rust
pub enum Expr {
    Val(i32),
    Add(Box<Expr>, Box<Expr>),
}
```

---

## FP take

![](/expr-problem-fp.png)

---

## Our target

![](/expr-problem-solution.png)

---

Visitor pattern (OO to FP side)

---

Solving the expression problem in Rust

---

Workshop (link to repo Algar examples)

---

Resources:

* https://www.youtube.com/watch?v=EsanJ7_U89A
* https://www.youtube.com/watch?v=FWW87fvBKJg

---
