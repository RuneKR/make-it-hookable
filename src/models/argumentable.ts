import {ArgumentableNext}   from './argumentable-next';
import {ArgumentableCb}     from './argumentable-cb';

export interface Argumentable<T, U> {
    (param: T, out: U, next: ArgumentableCb): any;
    actor?: ArgumentableNext<T, U>;
}
