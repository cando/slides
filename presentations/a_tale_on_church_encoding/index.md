---
theme: eloc
title: A Tale On Church Encoding
---

<style>
h1 { text-align: center;}
</style>

# A Tale On Church Encoding

Stefano Candori

---

## Church Encoding = `data` + `operators` in `λ-calculus`

<!-- The method is named for Alonzo Church, who first encoded data in the lambda calculus this way. -->

---


# λ-calculus
A formal system in mathematical logic for expressing `computation` based on `functions` 

<!-- 
It is a universal model of computation that can be used to simulate any Turing machine. It was introduced by the mathematician Alonzo Church in the 1930s as part of his research into the foundations of mathematics.
 -->

---

## There are only `functions`
There are no primitive _numbers_, _Boolean_ values, _branching_ instructions, _loops_. 

<!-- Instead, there's only functions, written as lambda expressions -->

---

### Lambda expression

```
λf.λx.f x
```

<style>
code { font-size: 2em;}
</style>

---

### Elixir

```elixir
fn f -> fn y -> f.(y) end end
```

<style>
code { font-size: 2em;}
</style>

---

## Church Boolean

```
true = λx.λy.x
false = λx.λy.y
and = λx.λy.x y x
or = λx.λy.x x y
not = λp.λx.λy.p y x
if = λp.λx.λy.p x y
```

<style>
code { font-size: 2em;}
</style>

---

## It's time to have fun



