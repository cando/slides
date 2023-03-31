---
theme: eloc
title: Solving The Expression Problem
---

# The Expression Problem

Stefano Candori

---

## Program = `data` + `operations`

---

### Data and operations should be `extensible`

---

### The Expression (`extension`) problem

---

## Extensibility

1. Code-level `modularization` (don't modify existing code)
2. Static `type safety`
3. (Separate `compilation`)

---

### `Open` for extension, `Closed` for modification

---

## A simple grammar

```
Exp ::= Val | Add
Val ::= non-negative integer
Add ::= Exp ‘+’ Exp
```

And a set of _operations_ on it (`pretty print`, `eval`, etc...)

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

We can easily add new `datatypes` <uim-rocket class="text-purple-400"/>

---

## OO take


```csharp{3}
public abstract class Expr{
    public abstract string PrettyPrint();
    public abstract int Eval();
}
```

But it's difficult to add new `operations`!
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

```rust
fn eval(expr: Expr) -> i32 {
    match expr {
        Expr::Val(i) => i,
        Expr::Add(x, y) => eval(x) + eval(y),
    }
}
fn render(expr: Expr) -> String {
    match expr {
        Expr::Val(i) => i.to_string(),
        Expr::Add(x, y) => format!("{} + {}", render(x), render(y)),
    }
}
```

We can easily add new `operations` <uim-rocket class="text-purple-400"/>

---

## FP take

```rust{4}
pub enum Expr {
    Val(i32),
    Add(Box<Expr>, Box<Expr>),
    Neg(i32), // NEW
}
```

But it's difficult to add new `datatypes`!
We need to `edit` the existing code <mdi-skull-crossbones-outline class="text-red-400"/>

---

## FP take

![](/expr-problem-fp.png)

---

## Our target

![](/expr-problem-solution.png)

---

## Visitor pattern

```csharp
interface IExpr
{
    TResult Accept<TResult>(IVisitor<TResult> visitor);
}

interface IVisitor<TResult>
{
    TResult VisitVal(Val literal);
    TResult VisitAdd(Add add);
}

```

---

## Visitor pattern

```csharp
class Val : IExpr
{
    public Val(int n) {N = n;}

    public int N { get;  }

    public TResult Accept<TResult>(IVisitor<TResult> visitor) => visitor.VisitVal(this);
}

class Add : IExpr{...}

class EvalVisitor : IVisitor<int>
{
    public int VisitVal(Val val) => literal.N;

    public int VisitAdd(Add add) => add.A.Accept(this) + add.B.Accept(this);
}

```

---

## Visitor pattern

It's now easy to add new `operations`, but difficult to add new `datatypes` <mdi-skull-crossbones-outline class="text-red-400"/>

```csharp{5}
interface IVisitor<TResult>
{
    TResult VisitVal(Val literal);
    TResult VisitAdd(Add add);
    TResult VisitNeg(Neg neg); // NEW
}

```

---

## We're back here (FP problem)

![](/expr-problem-fp.png)

---

## 3 ways to solve the expression problem

1. `Coproduct` of Functors
2. `Object` Algebras
3. `Final Tagless` Encoding

---

## It's time to `Rust`

![](/crab.png)
---

## Resources

* [`Algar`](https://github.com/cando/Algar/tree/main/examples/expression_problem) examples
* [`Final Tagless`](https://okmij.org/ftp/tagless-final/JFP.pdf) paper
* [`Data types à la carte`](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/14416CB20C4637164EA9F77097909409/S0956796808006758a.pdf/data_types_a_la_carte.pdf) paper
* Talks: [`1`](https://www.youtube.com/watch?v=FWW87fvBKJg
), [`2`](https://www.youtube.com/watch?v=EsanJ7_U89A) 

