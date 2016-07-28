import {ReturnablePostParams}     from    './returnable-next-post';

/**
 * Params for the next actor
 */
export interface ReturnableActorParams<T, U> {
    (arg: T): any;
}

/**
 * Actual actor as called by the component
 */
export interface ReturnableNextActor<T, U> {
    (arg: T, next: ReturnablePostParams<T, U>): any;
}
