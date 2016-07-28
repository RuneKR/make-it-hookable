# Introduction: make-it-hookable
Create hookable methods in classes in TypeScript using this static _HookableComponent_ class.
There are four types of [generic](https://www.typescriptlang.org/docs/handbook/generics.html) hookables:

* Argumentable
* ArgumentableAll
* Returnable
* ReturnableAll

One should notice that there are a kind of types to these hookables with an appendix of either All appended or nothing appended.

# The types of hookables
The aforementioned types are further described here. For the _All_ type it is possible to hook into three phases: _pre_, _actor_ and _post_ hooks. Otherwhise only actor is. These phases of hooking are described below.

| Phase       | Definition                                                          |
| ----------  | ----------------------------------------------                      |
| pre         | Manipulate the input parameters to the actors                       |
| actor       | Actors carrying out the intended functionality of a hookable method |
| post        | Mainpulate the output of the actors                                 |

Notice that more than one pre and post hook can be added. 

# Usage
To use this in your project and save it in the package.json file do:
`npm install make-it-hookable --save`

Pleas be aweare that we use [semantic versioning](http://semver.org). This means that you should be able to safely subscribe to updates on this module for versions 1.x.x or 2.x.x etc. Major versions for example from 1.x.x to 2.x.x is not safe as the module API might change.

# The component
The methods contained in the _HookableComponent_ are described in the table below. Please notice that thare are a one-to-one relation naming wise. Method _returnable_ returns _Returnable_ model, _argumentableAll_ returns the _ArgumentableAll_ model.

| Method                | Returned model        |
| --------------------  | ------------------    | 
| returnable<T, U>      | Returnable<T,U>       |
| returnableAll<T, U>   | ReturnableAll<T,U>    |
| --------------------  | -----------------     |
| argumentable<T, U>    | Argumentable<T,U>     |
| argumentableAll<T, U> | ArgumentableAll<T,U>  |

# Menaning of the generic types
Notice this about the generics, T and U:
* T: Type of input params to hookable method
* U: Type of output from hookable method

# Included models
So methods in the _HookableComponent_ class return these models described below. They are to be found in the _HookableModels_ exposted in this npm module. Below is described how a hookable method in a class is run with a specific model.

| Hook Model           | Phase | Called with           | Return           |
| -------------------- | ----------------------------- | ---------------- |
| Returnable<T,U>      | actor | arg1 : T, arg2: Next  | Promise<U>       |
| ReturnableAll<T,U>   | T: Type of input params       | Promise<U>       |
| Argumentable<T,U>    | T: Type of input params       | Void             |
| ArgumentableAll<T,U> | T: Type of input params       | Void             |

Promise a generic itself. Read more about es6-promise [here](https://github.com/stefanpenner/es6-promise).

# Examples (Detailed usage)
In order to create a define a hookable method:

```typescript
import {HookableComponent, HookableModels}  from    'make-it-hookable';

class SomeHookableClass {
    /**
    * Create a hookable method that returns a number and requires string as input param
    */
    public hookableMethod: HookableModels.ReturnableAll<String, Number> = HookableComponent.returnableAll();
}

let instance = new SomeHookableClass();

// some function that is 
let smartfunc = function () {
    console.log('hey');
}

instance.hookableMethod.actor.push(smartfunc);       // add a function that actually carry out the true functionality of the hookable method
instance.hookableMethod.pre.push(smartfunc);         // add a function that change the input params to the actor
instance.hookableMethod.post.push(smartfunc);        // add a function that change the output from the actors

// run the method
instance.hookableMethod('Goat').then((result: Number) => {

    // the content is returned here.
});

```

# License
The MIT License (MIT)
