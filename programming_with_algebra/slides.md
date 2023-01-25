---
theme: eloc
---

# Programming with Algebra

Stefano Candori 

<!-- Algebra and math is present in our everyday programming, mainly in functional programming?
Don't you believe it? Let's go! -->

---


## A `monad` is just a `monoid` in the category of `endofunctors`, what's the problem?

_— James Iry_

---

<img src="/category_theory_composition.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## You do not need to know <br/>`category theory` to <br/> write `good code`

<!-- functional programming is just compose functions, compose and compose again. 
Don't throw exceptions, don't use (global) state.

So why study category theory? 
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

<!-- 
How i arrive to study this?
1) Arise of functional programming
2) Functional programming patterns for simplify and solve common challenges that we encounter in our code daily, such as nullable values, error handling, parallel and sequential operations and data validation -> (monoids, functor, applicative, monads, traversable)
3) Strong relationship between (pure) functional programming and mathematics
4) And category theory explains them all
 -->

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

