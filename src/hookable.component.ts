import {Returnable}                from './models/returnable';
import {ReturnableAll}             from './models/returnable-all';
import {ReturnableNextPre}         from './models/returnable-next-pre';
import {ReturnableNextPost}        from './models/returnable-next-post';
import {Argumentable}              from './models/argumentable';
import {ArgumentableAll}           from './models/argumentable-all';
import {ArgumentableNext}          from './models/argumentable-next';
import {ArgumentableCb}            from './models/argumentable-cb';

import {Promise}                   from 'es6-promise';

/**
 * Set of generic methods that can create hookable methods based upon 
 * actors: Functions that atually perform the method
 * pre: Functions to filter the input to the actors
 * post: Functions that change of the actors
 */
export class HookableComponent {
    /**
     * Create a form of skeleton function that do not actually exists but can be hooked into and thereby created
     * @returns {ReturnableAll}     Generic version that depends on the <T> and <U>
     */
    public static returnable<T, U>(): Returnable<T, U> {

        let f: Returnable<T, U> = function (args: T): Promise<U> {

            // return the promise of a task will be done
            return new Promise((resolve: Function, reject: Function) => {

                // the next function run after the actor
                let next: any = function (res: any): void {

                    // resolve result
                    resolve(res);
                };

                // try to run through the whole stack
                try {
                    f.actor(args, next);

                    // catch error and send it back
                } catch (err) {

                    // send reject back
                    reject(err);
                }
            });
        };

        // prepare the holders
        f.actor = undefined;

        // return the function
        return f;
    }
    /**
     * Generate a three layer middleware with both pre post and put
     * @returns {ReturnableAll}     Generic version that depends on the <T> and <U>
     */
    public static returnableAll<T, U>(): ReturnableAll<T, U> {

        let f: ReturnableAll<T, U> = function (arg: T): Promise<U> {

            return new Promise((resolve: Function, reject: Function) => {

                // create stack that are being run
                let stack_pre: Array<ReturnableNextPre<T>> = [];
                Array.prototype.push.apply(stack_pre, f.pre);

                let stack_post: Array<ReturnableNextPost<T, U>> = [];
                Array.prototype.push.apply(stack_post, f.post);

                // next for post
                let next_post: any = function (param: T, res: U): void {

                    // check if any functions are left to run
                    if (stack_post.length === 0) {
                        resolve(res);
                    }

                    // next function to run
                    let func: ReturnableNextPost<T, U> = stack_post.shift();

                    // try to run through the whole stack
                    try {
                        func(param, res, next_post);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // next for actor 
                let next_actor: any = function (res: T): void {

                    // try to run through the whole stack
                    try {
                        f.actor(res, next_post);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // next for pre
                let next_pre: any = function (param: T): void {

                    // check if any functions are left to run
                    if (stack_pre.length === 0) {
                        next_actor(param);
                    }

                    // next function to run
                    let func: ReturnableNextPre<T> = stack_pre.shift();

                    // try to run through the whole stack
                    try {
                        func(param, next_pre);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start the stacking
                next_pre(arg);
            });
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = undefined;

        return f;
    }
    /**
     * Generate an argumentable method that dose not actually exists but can be hooked into to create functionality
     * @returns {Argumentable}     Generic version that depends on the <T> and <U>
     */
    public static argumentable<T, U>(): Argumentable<T, U> {

        let f: Argumentable<T, U> = function (req: T, res: U, resolve: ArgumentableCb): void {

            // resolving the actor
            let next: any = (err: any) => {

                // send back result
                resolve(err);
            };

            // try to run through the whole stack
            try {
                f.actor(req, res, next);

                // catch error and send it back
            } catch (err) {

                // send reject back
                resolve(err);
            }
        };

        // prepare the holders
        f.actor = undefined;

        return f;
    }
    /**
     * Generate a full three layer hookable method
     * @returns {ArgumentableAll}     Generic version that depends on the <T> and <U>
     */
    public static argumentableAll<T, U>(): ArgumentableAll<T, U> {

        let f: ArgumentableAll<T, U> = function (req: T, res: U, resolve: ArgumentableCb): void {

            // create stack that are being run
            let stack: Array<ArgumentableNext<T, U>> = [];

            Array.prototype.push.apply(stack, f.pre);
            stack.push(f.actor);
            Array.prototype.push.apply(stack, f.post);

            // run stack
            let next: any = function (err: any): void {

                // send back the error
                if (err !== undefined) {
                    return resolve(err);
                }

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: ArgumentableNext<T, U> = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // catch error and send it back
                } catch (err) {

                    // send reject back
                    resolve(err);
                }
            };

            // start ReturnableNext
            next();
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = undefined;

        return f;
    }
}
