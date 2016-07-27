# Introduction: make-it-hookable
Create hookable methods in classes in TypeScript using this static _HookableComponent_ class.
There are four types of [generic](https://www.typescriptlang.org/docs/handbook/generics.html) hookables:

* Argumentable
* ArgumentableAll
* Returnable
* ReturnableAll

One should notice that there are a kind of subtype to these hookables with an appendix of either All added or nothing. 
The appenix indicate weather or not pre, actor and post is avalable to be hooked into. Where All is added pre, actor and post is allowed. Otherwhise only actor is.

# The subtypes of hookables
The aforementioned subtypes are defined in the table below.

| Subtype  | Definition                                     |
| -------- | ---------------------------------------------- |
| pre      | Manipulate the input parameters to the actors  |
| actor    | Actors carrying out the intended functionality |
| post     | Mainpulate the output of the actors            |

Notice that more than one pre, post and actor hook can be added. 

# Usage
To use this in your project and save it in the package.json file do:
`npm install make-it-hookable --save`

Pleas be aweare that we use [semantic versioning](http://semver.org). This means that you should be able to safely subscribe to updates on this module for versions 1.x.x or 2.x.x etc. Major versions for example from 1.x.x to 2.x.x is not safe as the module API might change.

# The component
The methods contained in the _HookableComponent_ are described in the table below. Please notice that thare are a one-to-one relation naming wise. 
Method returnable returns Returnable model, argumentableAll returns the ArgumentableAll model.

| Method               | Returned model     |
| -------------------- | ------------------ | 
| returnable<T, U>     | Returnable<T,U>    |
| returnableAll<T, U>  | ReturnableAll<T,U> |
| -------------------- | -----------------  |
| argumentable<T, U>   | Argumentable<T,U>  |
| returnableAll<T, U>  | Argumentable<T,U>  |

# Included models
So methods in the _HookableComponent_ class return these models described below. They are to be found in the _HookableModels_ exposted in this npm module.

CONTINUE FROM HERE!!!

| Model                | Generics                 | Retrusn    |
| -------------------- | ------------------------ | ---------------- |
| Returnable<T,U>      | T:                       | actor            |
| returnableAll<T, U>  | Model:ReturnableAll<T,U> | actor, pre, post |
| -------------------- | -----------------------  | ---------------- |
| argumentable<T, U>   | Model:Argumentable<T,U>  | actor            |
| returnableAll<T, U>  | Model:Argumentable<T,U>  | actor, pre, post |

Read more about es6-promise [here](https://github.com/stefanpenner/es6-promise).

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

instance.hookableMethod.actor.push();       // add a function that actually carry out the true functionality of the hookable method
instance.hookableMethod.pre.push();         // add a function that change the input params to the actor
instance.hookableMethod.post.push();        // add a function that change the output from the actors

// run the method
instance.hookableMethod('Goat').then((result: Number) => {

    // the content is returned here.
});

```

# License
The MIT License (MIT)
