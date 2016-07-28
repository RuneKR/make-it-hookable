# Introduction: make-it-hookable
Create hookable methods in classes in TypeScript using this static _HookableComponent_ class.
There are four types of [generic](https://www.typescriptlang.org/docs/handbook/generics.html) hookables:

* Argumentable
* ArgumentableAll
* Returnable
* ReturnableAll

One should notice that the hookables is separated into: _Argumentable_ vs _Returnable_ and _All_ appended to their name or nothing appended to their name.

# The types of hookables
The aforementioned appendence are further described here. For the _All_ type it is possible to add three types of hooks: _pre_, _actor_ and _post_. When _nothing_ is added, only the _actor_ are. 

| Type        | Definition                                                          |
| ----------  | ----------------------------------------------                      |
| pre         | Manipulate the input parameters to the actors                       |
| actor       | Actors carrying out the intended functionality of a hookable method |
| post        | Manipulate the output of the actors                                 |

Notice that multiple pre and post hook can be added.

# Usage
To use this in your project and save it in the package.json file do:
`npm install make-it-hookable --save`

Please be aware that we use [semantic versioning](http://semver.org). This means that you should be able to safely subscribe to updates on this module for versions 1.x.x or 2.x.x etc. Major versions for example from 1.x.x to 2.x.x is not safe as the module API might change.

# The component
In order to create hookable method the static methods from the _HookableComponent_ should be used. These methods are described in the table below. Please notice something about the naming. Method _returnable_ returns a _Returnable_ model, _argumentableAll_ returns a _ArgumentableAll_ mode and so on.

| Method                | Returned model        |
| --------------------  | ------------------    | 
| returnable<T, U>      | Returnable<T,U>       |
| returnableAll<T, U>   | ReturnableAll<T,U>    |
| argumentable<T, U>    | Argumentable<T,U>     |
| argumentableAll<T, U> | ArgumentableAll<T,U>  |

Notice this about the generics, T and U:
* T: Type of input prams to hookable method
* U: Type of output from hookable method

All models in this project is exposed in _HookableModels_ in this module use as needed. 

# The returnable hookable model
The returnable model will return a es6-promise [Promise](https://github.com/stefanpenner/es6-promise) that is resolved once all hooks has been fired or rejected if anything goes wrong. 

## Models involved in returnable hooks
Here the models are described involving hookables that are returnable. Returnable hooks a asynchronous, so they should call a next function with some parameters when they are done and they want the next hook to be fired. The parameters for the hooks are here described and then the the parameters that should be given to the next functions are described.

| Hook Model           | Type  | Called with                                    | Returns    |
| -------------------- | ----- |----------------------------------------------- | ---------- |
| Returnable<T,U>      | actor | arg1 : T, next: ReturnableActorParams          | Promise<U> |
| ReturnableAll<T,U>   | pre   | arg1 : T, next: ReturnablePreParams            | Promise<U> |
|                      | actor | arg1 : T, next: ReturnableActorParams          |            |
|                      | post  | arg1 : T, arg2: U, next: ReturnablePostParams  |            |

The contents of the next functions are as follows:

| Next function               | Called with      |
| --------------------        | ---------------- | 
| ReturnableActorParams<T>    | arg1: T          |
| ReturnablePreParams<T>      | arg1: T          |
| ReturnableActorParams<T, U> | arg1: T, arg2: U |

## Example of returnable hooks

```typescript
import {HookableComponent, HookableModels}  from    'make-it-hookable';

/**
* Some class that has a hookable method
*/
class SomeHookableClass {
    /**
    * Create a hookable method that returns the number of a given animal
    * Output should here be a number and input should be a string
    */
    public hm: HookableModels.ReturnableAll<String, Number> = HookableComponent.returnableAll();
}

// create instance of class
let instance = new SomeHookableClass();

// create a pre hook
instance.hm.push((input: String, next: ReturnablePreParams<String>) => {
    
    // change value of input to allways be goat
    next('goat');
});

// create an actor
instance.hm.actor = (input: String, next: ReturnablePostParams<String, Number>) => {
    
    // change value of input to allways be goat
    next(input, 10);
};

// create an post hook
instance.hm.post.push((input: String, next: ReturnablePostParams<String, Number>) => {
    
    // increase the number to 20
    next(input, 20);
});

// run the method (async)
instance.hm('Cow').then((result: Number) => {

    // the content is returned here. (20 goats)
    console.log('There are: ' + result);
});

```

# License
The MIT License (MIT)
