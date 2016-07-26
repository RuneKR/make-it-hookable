Create hookable methods in classes in TypeScript using this static _HookableComponent_ class.
There are two types of generic hookables:
* Argumentable
* Returnables

Besides these two types there are subtypes either called Nothing or All. Read about them below. [Generic](https://www.typescriptlang.org/docs/handbook/generics.html) is defined by typescript.

To use this in your project and save it in the package.json file do:
`npm install make-it-hookable --save`

Pleas be aweare that we use [semantic versioning](http://semver.org). This means that you should be able to safely subscribe to updates on this module for versions 1.x.x or 2.x.x etc. Major versions for example from 1.x.x to 2.x.x is not safe as the module API might change.

# The component
The methods 

# Included models

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