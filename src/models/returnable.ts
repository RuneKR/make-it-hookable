import {ReturnableNextActor}    from './returnable-next-actor';
import {Promise}                from 'es6-promise';

export interface Returnable<T, U> {
    (args: T): Promise<U>;
    actor?: ReturnableNextActor<T, U>;
}
