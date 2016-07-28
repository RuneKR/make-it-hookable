import {ReturnableNextActor} from './returnable-next-actor';
import {ReturnableNextPre}   from './returnable-next-pre';
import {ReturnableNextPost} from './returnable-next-post';
import {Promise}        from 'es6-promise';

export interface ReturnableAll<T, U> {
    (args: T): Promise<U>;
    pre?: Array<ReturnableNextPre<T>>;
    post?: Array<ReturnableNextPost<T, U>>;
    actor?: ReturnableNextActor<T, U>;
}
