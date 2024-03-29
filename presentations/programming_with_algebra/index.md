---
theme: eloc
title: Programming with Algebras
---

# Programming with Algebras

Stefano Candori

<!--
- Talk from Bartoz, LambdaCon 2015.
- Algebra of data structures, Algebraic structures
- Category as quintessential algebraic structure
- A talk on category theory

https://jrsinclair.com/articles/2019/algebraic-structures-what-i-wish-someone-had-explained-about-functional-programming/

-->

---

## A `monad` is just a `monoid` in the category of `endofunctors`, what's the problem?

---

<div class="grid grid-cols-2 gap-4 justify-items-center items-center">
    <img src="/category_theory_composition.png" class="rounded-3-xl shadow-xl h-80" />
    <img src="/category_theory_two_elements_boxed.png" class="rounded-3-xl shadow-xl h-70" />
</div>

---

## You do not need to know <br/>`category theory` to <br/> write `good` functional `code`

<!-- 
functional programming is just compose functions, compose and compose again. 
No mutable data. Deterministict and Pure functions (no side effects). Bla blah

So why study category theory? 

Let's start with a metaphore (doing things step by step and abstracting things i know how to do)
-->

---

## `Composition` and `abstraction` are the essence of `human reasoning` 

---

## `Composition` and `abstraction` are the essence of `programming` 

---

## `Composition` and `abstraction` are the essence of `category theory` 

<!-- 
So again study category theory (be pragmatic)? 

Functional programming patterns (algebraic structures) for simplify and 
solve common challenges that we encounter in our code daily, 
such as nullable values, error handling, parallel and sequential 
operations and data validation -> (monoids, functor, applicative, monads, traversable).

Software design patterns were popularised by a bunch of smart people. They observed common approaches to programming problems 
and then wrote books about it. Like design patterns, algebraic structures also represent templates for solving a problem. 
And they can be used in many different situations. Unlike design patterns though, algebraic structures have their basis in mathematics. 

Category theory gives a formalization and allows us to understand and interpret those patterns!

Algebraic structures help us in the same way all other abstractions help us. -->

---

## `Category theory`

1. helps to `understand` how to proper `structure` and `compose` your programs
2. `unlocks` your abstract thinking
3. lends to extremely useful programming `ideas` which are percolating into every language
4. It's funny and makes me `happy` <uim-rocket class="text-purple-400"/>

---

## `Applied` Category Theory

* Emerging field!
* Explosion of papers, research, development in last 10 years
* Builds a common vocabulary of composition across disciplines (e.g. databases, thermodynamics, quantum theory, digital circuits, distributed systems, ...)

---

## The `Plan`

* I want to put `category theory` on your roadmap/radar
* The big idea: `compositionality`
* Case study: `ADTs` and algebraic structures in functional design patterns (`functors`, `applicatives` and `monads`!)

---

## A `category` consists of `objects` and `arrows` that go between them

---

<img src="/category_pig.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

# Arrows `compose`

---

<img src="/category_theory_composition.png" class="rounded-3-xl shadow-xl m-120 h-120" />

<!-- 

We don't mind what objects are! flowers? numbers? Chair? boxes? that's ok 

An object in category theory is an abstract nebulous entity. All you can ever know about it is how it relates to other object — how it connects with them using arrows.

-->

---
layout: image-right
image: /category_laws.png

---

## `Laws`

1. __Identity__ for composition
2. __Associativity__ in composition 

---

### 1-Object Category: `Monoid`


![](/category_theory_monoid_1.png)

---

### Addition `Monoid`

![](/category_theory_monoid.png)

<!-- 
Monoid: 
- combining two values into one! 
- two operations: identity and combine
-->

---

### Category of Sets (`types` + `functions`)

![](/category_composition_example.png)


---

# Breathe.

<!-- 

1) believe or not you'just meet your first algebraic structure. A category is an algebraic structure.

2) An algebraic structure consists of a nonempty set A, 
a collection of operations on A (typically binary operations), and a finite set of laws, that these operations must satisfy. 

But before, let's dig into something a bit different...ADTs!

-->

---

## `Algebrical Data Types`

A type formed by combining other types

1. __Product__ types
2. __Sum__ types

<!-- 
Algebrical data types are not algebraic structure, they only share the name :)

One of the most amazing aspects of mathematics is that it applies to such a wide range of areas.
we'll use elementary school algebra to reason about functional data types. 

-->

---

## `Product`

```haskell
data Point  = Point {
    x :: U8,
    y :: U8
}
```

Point has `x * y` _(256 * 256)_ possible values


<!-- 

Struct: defines a physically grouped list of variables under one name in a block of memory
-->

---

## `Product`

<div grid="~ cols-4 gap-4">
<div class="col-span-2">

A product of two objects `a` and `b` is the object `c` equipped with two projections such that for any other object `c’` equipped with two projections there is a unique morphism `m` from `c’` to `c` that factorizes those projections

</div>
<div class="col-start-4">
```mermaid {theme: 'dark', scale: 2}
graph TD
C'(c') -. m .->  C(c)
C'-- p' --> A(a)
C-- p --> A(a)
C-- q --> B(b)
C'-- q' --> B(b)
```
</div>
</div>

---

## `Product`

<div grid="~ cols-4 gap-4">
<div class="col-span-2">

A product of two objects `a` and `b` is the object `c` equipped with two projections such that for any other object `c’` equipped with two projections there is a unique morphism `m` from `c’` to `c` that factorizes those projections

</div>
<div class="col-start-4">
```mermaid {theme: 'dark', scale: 1.78}
graph TD
C'(Int) -. m .->  C((Int,Bool))
C'-- p --> A(a)
C-- fst --> A(Int)
C-- snd --> B(Bool)
C'-- q --> B(Bool)
```
</div>
</div>

<!-- Example of morphism m Int -> (Int, True) 

A common thing to do in category theory is to reverse all the arrows and get the "dual" category.
Given each "statement" you get another "statement" for free: 

E.g. Doing so for a the product gives us the co-product 

-->

---

## `Coproduct`

<div grid="~ cols-4 gap-4">
<div class="col-span-2">

A coproduct (sum) of two objects `a` and `b` is the object `c` equipped with two injections such that for any other object `c’` equipped with two injections there is a unique morphism `m` from `c` to `c’` that factorizes those injections

</div>
<div class="col-start-4">
```mermaid {theme: 'dark', scale: 2}
graph TB
A(a) -- i --> C(c)
A(a) -- i' --> C'(c')
B(b) -- j --> C(c)
C(c) -. m .-> C'(c')
B(b) -- j' --> C'(c')
```
</div>
</div>

<!-- The two injections can either be implemented as constructors or as functions. Let's see an example -->

---

## `Sum` types

```haskell{all|2|3|all}
data Card = 
    Number(U8) -- injection `i`: u8 -> Card
  | Figure(FigureType) -- injection `j`: FigureType -> Card


data FigureType = King | Queen | Jack,
```

Card has `3 + n` _(3 + 256)_ possible values

<!-- type which can be one of a few different variant (discriminate unions).  -->

---

```haskell

data Contact1 = Contact1 {
    address :: Maybe String,
    number :: Maybe Int
}

data Contact2 = 
   AddressAndNumber String Int
 | Address String
 | Number Int
```

<v-click>

_Contact1_ has `c1 = (s + 1) * (i + 1)` values. <br />
_Contact2_ has `c2 = (s * i) + s + i` values. <br />
But `c1 = (s * i) + s + i + 1`. <br />
So `c1 != c2` (no address provided is not possible in _Contact2_)

</v-click>

<!-- possible in Contact1 {Address = None, Number = None} -->

---

## Make illegal states `unrepresentable`

---

## Phew.
Now, back to `Algebraic` Structures

---

<img src="/category_theory_two_elements.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

<img src="/category_theory_two_elements_boxed.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## `Lift` content into a `context`

![](/category_theory_functor.png)

<style>
  img {
    height: 460px;
  }
</style>

<!-- 
We we want/need to add some metadata to our content.

we have a triangle, maybe more than one.

We have something which is nullable -->

---

* `Option` _(Maybe)_
* `List`
* `Result` _(Either)_
* `Future`
* ...

---

# `Functor`

placing stuffs into `boxes`

---

## `Lift` content into a `context`

![](/category_theory_functor.png)

<style>
  img {
    height: 460px;
  }
</style>


<!-- 

Back again to this slide. 

-->
---

## `Mapping` categories

![](/category_theory_functor_2.png)

<style>
  img {
    height: 560px;
  }
</style>

<!-- 

Can be seen as a mapping from one category to another.
To be a functor i have to know how to map objects but also how to map arrows/functions!

If i know how to transform a triangle into a square, i must know how to transform a boxed triangle in a boxed square, isn' it?

-->

---

## `Functor`
1. placing stuffs into `boxes`
2. a `mapping` between categories
3. a `mappable` container

<v-click>
```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```
</v-click>

<!-- Ultra quick haskell syntax recap: http://cheat.sh/haskell/Type_signatures 
Currying: translating the evaluation of a function that takes multiple arguments 
into evaluating a sequence of functions, each with a single argument. 
-->

---

## `Maybe` Functor

```haskell
data  Maybe a  =  Nothing | Just a

instance  Functor Maybe  where
    fmap _ Nothing       = Nothing
    fmap f (Just a)      = Just (f a)
```

---

## `List` Functor

```haskell
data List a = [] | a : List a

instance Functor List where
    fmap _ []     = []
    fmap f (x:xs) = f x : fmap f xs
```

---

<img src="/category_theory_function_boxed.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

<img src="/category_theory_ap.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

<img src="/category_theory_ap_indipendent.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## `Applicatives`
1. applying `lifted` function
2. `combine` more boxes into one
3. fmap with `n-arity` functions

<v-click>
```haskell
class (Functor f) => Applicative f where
    (<*>) :: f (a -> b) -> f a -> f b

liftA2 :: (Applicative f) => (a -> b -> c) -> f a -> f b -> f c
```
</v-click>

---

## `Maybe` Applicative

```haskell
instance Applicative Maybe where
  (<*>) Nothing _ = Nothing
  (<*>) _ Nothing = Nothing
  (<*>) (Just f) (Just x) = Just (f x)
```

<v-click>
```haskell
>> Person
  <$> parseString "name" o
  <*> parseInt "age" o
  <*> parseTelephone "telephone" o
-- Just (Person {name = "Joe", age = 12, telephone = ...})

>> (*) <$> Nothing <*> Just 2
-- Nothing
```
</v-click>

---

<img src="/category_theory_monad_1.png" class="rounded-3-xl shadow-xl m-120 h-120" />

<!-- not a functor, we want to dig into two levels
not an applicative, they are not indipendent boxes, but one inside the other -->

---

<img src="/category_theory_monad_flatten.png" class="rounded-3-xl shadow-xl m-120 h-120" />

---

<img src="/category_theory_monad_2.png" class="rounded-3-xl shadow-xl m-120 h-120" />

<!-- a flat + map operation -->

---

# Here you are, `Monads`!
<!-- believe it or not, monad is just flattening boxes. -->

---

<img src="/category_theory_monad_chain.png" class="rounded-3-xl shadow-xl m-120 h-120" />

<!-- A lot of common, useful computations 
 follow the pattern of performing sequences of tiny computations on values, and monad simply abstract that!

 flatmap: connect the output of one computation to a function that consumes the output and then returns another computation.
 
 -->

---

## `Monads`
1. `flattening` boxes
2. `chaining` computations

<v-click>
```haskell
class (Applicative m) => Monad m where
    bind :: m a -> (a -> m b) -> m b
    -- return :: a -> m a
```
</v-click>

<!-- Every computation depends on the previous.
 bind = flatmap: connect the output of one computation to a function that consumes the output and then returns another computation.
 -->


---

### `Do` notation

```haskell
-- haskell do notation
getUsername path = do
  contents <- readFile path
  username <- readUsername contents
  return username
```
<v-click>
```fsharp
// F# computation expression
let readUserNameFromFile =
    result {
        let! username_file = openFile "hello.txt"
        let! username = readUsername username_file
        return username
    }
```
</v-click>

---

```scala
// Scala for syntax
for {
  username_file <- openFile "hello.txt"
  username <- readUsername username_file
} yield username

```
<v-click>
```rust
/// Rust `?` Operator
fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```
</v-click>
<v-click>
```csharp
// C# LINQ query syntax
from username_file in openFile("hello.txt")
from username in readUsername(username_file)
select username
```
</v-click>

---

<img src="/monads-everywhere.jpg" class="rounded-3-xl shadow-xl m-120 h-120" />

---

## A `generic` model of `composition` that lets you choose the environmental features that you want for your computations

<!-- 

Monad is a simple and powerful design pattern for function composition.

It's just that a lot of common, useful computations follow the pattern of performing sequences of tiny computations on values. And that's what bind let you do. They let you build up useful, complex computations.
Here's where it gets cool. Different monads offer different kinds of environments/side effects in which to interpret the computations that you construct. 

For example, the State monad lets you perform computations within an environment in which each computation has access to some blob of state. 

BUT:
If you're accustomed to imperative programming languages, you're probably thinking, "Big deal, I can mix state into my computations already. I don't need monads to let me do it." And you would be right.

But you would also be missing the point. 

Often, you don't need to work with state. And yet most programming languages force you to carry out all of your computations in an environment that makes you manage state anyway, at least in your head. When you don't need it, it's baggage. It's a burden. It's one more thing that can go wrong.

If you're using monads, on the other hand, you can be explicit about when you need and do not need state – and other environmental features. 

https://www.reddit.com/r/programming/comments/ox6s/ask_reddit_what_the_hell_are_monads/ 

-->

---

## It's all about taming `complexity` 
Monads help you increasing `modularity` and `reusability` by separating the `problem domain` from the implementation detail

 <!-- You can build your environments to perfectly match your requirements. 
 
 (And, if you're using a programming language like Haskell/Rust that offers a 
 modern static type system in addition to monads, you can be assured of never 
 accidentally mixing computations intended for different environments.) 

If you want an environment that supports exceptions, closures, and state, just stack up a few monads, and you've got it. 
If you need continuations, I/O, and a stream of random integers, no problem: just set up a different stack. 

Monad transformers, FTW (we'll see later in the exercise)

 -->

---

<img src="/understand_monads.png" class="rounded-3-xl shadow-xl" />

---
layout: image-right
image: /monad_endofunctor.png

---

## `Monads` Categorically
An `(endo)functor` (from a category to itself) together with two `monoidal` operations (`natural transformations`)

1. `bind`: combine two values into one 
2. `return`: the identity

<style>
  h2 + p {
    margin-top: -2.5rem;
    margin-bottom: 1.5rem;
  }
</style>

---

## `Summary`
1. `Category Theory` => how things compose & common vocabolary
2. `ADTs`            => compose types to make illegal states unrepresentable
3. `Functor`         => lift values into a context
4. `Applicative`     => indipendent values applied to a function in a context
5. `Monad`           => sequencing contextful operations  


---

## Where to go `next`?

![](/fantasy_land.png)


