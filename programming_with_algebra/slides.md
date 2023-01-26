---
theme: eloc
title: Programming with Algebra
---

# Programming with Algebra

Stefano Candori

<!--
Algebra and math is present in our everyday programming, mainly in functional programming?
Don't you believe it? Let's go!
-->

---


## A `monad` is just a `monoid` in the category of `endofunctors`, what's the problem?

_— James Iry_

---

<img src="/category_theory_composition.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## You do not need to know <br/>`category theory` to <br/> write `good` functional `code`

<!-- functional programming is just compose functions, compose and compose again. 
Don't throw exceptions, don't use (global) state.

So why study category theory? 

1) Arise of functional programming
2) Functional programming patterns for simplify and solve common challenges that we encounter in our code daily, such as nullable values, error handling, parallel and sequential operations and data validation -> (monoids, functor, applicative, monads, traversable)
3) Strong relationship between (pure) functional programming and mathematics
4) And category theory explains them all
-->

---

## `Composition` and `abstraction` are the essence of `category theory` 

---

## `Composition` and `abstraction` are the essence of `programming` 

---

## `Category theory`

1. helps to __understand__ how and why things are done in a certain way
2. __unlocks__ your abstract thinking
3. It's funny and makes me __happy__ <uim-rocket />

---

## A `category` consists of `objects` and `arrows` that go between them

---

<img src="/category_pig.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## Arrows `compose`
What defines a `category` is how the arrows (`morphism`) compose

---

<img src="/category_theory_composition.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---
layout: image-right
image: /category_laws.png

---

## `Laws`

1. __Identity__ for composition
2. __Associativity__ in composition 

---

# Breath.

---

## `Algebrical Data Types`

A type formed by combining other types

1. __Product__ types
2. __Sum__ types

<!-- One of the most amazing aspects of mathematics is that it applies to such a wide range of areas.
we'll use elementary school algebra to reason about functional data types. -->

---
layout: image-right
image: /product.png

---
## `Product`

A product of two objects `a` and `b` is the object `c` equipped with two projections such that for any other object `c’` equipped with two projections there is a unique morphism `m` from `c’` to `c` that factorizes those projections

---
layout: image-right
image: /product_2.png

---
## `Product`

A product of two objects `a` and `b` is the object `c` equipped with two projections such that for any other object `c’` equipped with two projections there is a unique morphism `m` from `c’` to `c` that factorizes those projections

<!-- Example of morphism m Int -> (Int, True) -->

---

## `Product`

```rust
struct Point {
    x: u8,
    y: u8,
}

struct Point(u8, u8);
```

Point has `x * y` _(255 * 255)_ possible values


<!-- A common thing to do in category theory is to reverse all the arrows and see what happens. Doing so for a the product gives us the co-product -->

---
layout: image-right
image: /coproduct.png

---
## `Coproduct`

A coproduct (sum) of two objects `a` and `b` is the object `c` equipped with two injections such that for any other object `c’` equipped with two injections there is a unique morphism `m` from `c` to `c’` that factorizes those injections

<!-- The two injections can either be implemented as constructors or as functions. Let's see an example -->

---

## `Sum` types

```rust{all|2|3|all}
enum Card {
    Number(u8), // injection `i`: u8 -> Card
    Figure(FigureType), // injection `j`: FigureType -> Card
}

// enum FigureType {
//     King,
//     Queen
// }
```
Card has `2 + n` _(2 + 255)_ possible values

<!-- tagged union, variant, enumerative -->

---

```rust

struct Contact1 {
    Address : Option<String>,
    Number : Option<u32>
}

enum Contact2{ 
  AddressAndNumber(String, u32),
  Address(String),
  Number(u32),
}

```

_Contact1_ has `c1 = (s + 1) * (i + 1)` values. <br />
_Contact2_ has `c2 = (s * i) + s + i` values. <br />
But `c1 = (s * i) + s + i + 1`. <br />
So `c1 != c2` (no address provided is not possible in _Contact2_)

<!-- possible in Contact1 {Address = None, Number = None} -->

---

## Make illegal states `unrepresentable`

---

## Meet [`Algar`](https://github.com/cando/Algar) 

A Rust crate exposing algebric structures, higher-kinded types and other category theory bad ideas.

<!-- We'll use code from this library, but don't focuse on code, focus on understading the concepts -->

---

## `Functor`
1. a mapping between categories
2. a type that can be mapped over


<v-click>
```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```
</v-click>

---

```rust {all|2|3|5-7}
pub trait Functor {
    type Unwrapped;
    type Wrapped<B>: Functor;

    fn fmap<F, B>(self, f: F) -> Self::Wrapped<B>
    where
        F: Fn(Self::Unwrapped) -> B;
}
```
---
