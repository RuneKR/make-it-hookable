/**
 * Content of the next function called between post calls
 */
export interface ReturnablePostParams<T, U> {
    (arg: T, res: U): any;
}

/**
 * What a hook should contain
 */
export interface ReturnableNextPost<T, U> {
    (arg: T, res: U, next: ReturnablePostParams<T, U>): any;
}
