import {ReturnableNextPost}     from    './returnable-next-post';

export interface ReturnableNextActor<T, U> {
    (arg: T, next: ReturnableNextPost<T, U>): any;
}
