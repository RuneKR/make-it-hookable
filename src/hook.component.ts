import * as Promise from 'bluebird';
import { waterfall, applyEach, constant } from 'async';
import { HooksWrapped, HooksActor, BaseHook } from './hook.lib';

// obs i corrected something in typings for applyeach just added a line that works

/**
 * Creates parallel excutable methods where actors are parallel but pre and post are seriel
 */
export class HooksParallel {
    /**
     * Create hookable method that support pre, actor and post hooks
     */
    public createWrapped<T extends BaseHook>(stack: HooksWrapped<any, any, any>): T {

        // look for all the arrays and arrange them in order
        let f: any = function (...args: Array<any>): Promise<any> {

            // return new promise of result
            return new Promise<any>((resolve: Function, reject: Function) => {

                // start the pre and then run the rest of the wrapped
                waterfall([constant.apply(undefined, args)].concat(f.stack.pre), (err: Error, ...args: Array<any>) => {

                    // if error is made
                    if (err) {
                        return reject(err);
                    }

                    // apply the new arguments and get actor results
                    applyEach(f.stack.actor, args, (err: Error, result: Array<any>) => {

                        // if error is made
                        if (err) {
                            return reject(err);
                        }

                        // push result into args
                        args.push(result);

                        // start the post hooks and return values
                        waterfall([constant.apply(undefined, args)].concat(f.stack.post), (err: Error, ...results: Array<any>) => {

                            // if error is made
                            if (err) {
                                return reject(err);
                            }

                            // return the actual result as the last elemnt of the array
                            resolve(results[results.length - 1]);
                        });
                    });
                });
            });
        };

        // save reference to the hooks
        f.stack = {
            actor: stack.actor,
            post: stack.post,
            pre: stack.pre
        };

        // return the creation
        return f;
    }
    /**
     * Create hookable method that support only actors
     */
    public createActor<T extends BaseHook>(stack: HooksActor<any>): T {

        // look for all the arrays and arrange them in order
        let f: any = function (...args: Array<any>): Promise<any> {

            // return new promise of result
            return new Promise<any>((resolve: Function, reject: Function) => {

                // go for all the actors in stack
                applyEach(f.stack, args, (err: Error, result: Array<any>) => {

                    // if error is made
                    if (err) {
                        return reject(err);
                    }

                    // return the result
                    resolve(result);
                });
            });
        };

        // save reference to the hooks
        f.stack = stack.actor;

        // return the creation
        return f;
    }

}

/**
 * Creates seriel excutable methods where actors are parallel but pre and post are seriel
 */
export class HooksSeriel {
    /**
     * Create hookable method that support pre, actor and post hooks
     */
    public createWrapped<T extends BaseHook>(stack: HooksWrapped<any, any, any>): T {

        // look for all the arrays and arrange them in order
        let f: any = function (...args: Array<any>): Promise<any> {

            // return new promise of result
            return new Promise<any>((resolve: Function, reject: Function) => {

                // start a warterfall off all the stack
                waterfall([constant.apply(undefined, args)].concat(f.stack), (err: Error, ...results: Array<any>) => {

                    // if error is made
                    if (err) {
                        return reject(err);
                    }

                    // return the actual result as the last elemnt of the array
                    resolve(results[results.length - 1]);
                });
            });
        };

        // save reference to the hooks
        f.stack = stack.pre.concat(stack.actor).concat(stack.post);

        // return the creation
        return f;
    }
    /**
     * Create hookable method that support only actors 
     */
    public createActor<T extends BaseHook>(stack: HooksActor<any>): T {

        // look for all the arrays and arrange them in order
        let f: any = function (...args: Array<any>): Promise<any> {

            // return new promise of result
            return new Promise<any>((resolve: Function, reject: Function) => {

                // start a warterfall off all the stack
                waterfall([constant.apply(undefined, args)].concat(f.stack), (err: Error, ...results: Array<any>) => {

                    // if error is made
                    if (err) {
                        return reject(err);
                    }

                    // return the actual result as the last elemnt of the array
                    resolve(results[results.length - 1]);
                });
            });
        };

        // save reference to the hooks
        f.stack = stack.actor;

        // return the creation
        return f;
    }
}
