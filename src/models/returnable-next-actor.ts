import {ReturnablePostParams}     from    './returnable-next-post';

/**
 * Parameters accepted by the next function in actor hooks
 * @params  {T}      arg    input to the hookable method
 * @returns {any}    any      
 */
export interface ReturnableActorParams<T> {
    (arg: T): any;
}

/**
 * The parameters given to actor type hook
 * @params  {T}      arg    input to the hookable method
 * @returns {any}    any    
 */
export interface ReturnableNextActor<T, U> {
    (arg: T, next: ReturnablePostParams<T, U>): any;
}
