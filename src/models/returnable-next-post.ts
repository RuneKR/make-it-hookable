/**
 * Parameters accepted by the next function in post type hooks
 * @params  {T}      arg    input to the hookable method
 * @params  {U}      res    result of the hookable method
 * @returns {any}    any      
 */
export interface ReturnablePostParams<T, U> {
    (arg: T, res: U): any;
}

/**
 * The parameters given to post type hooks
 * @params  {T}      arg    input to the hookable method
 * @params  {U}      res    result of the hookable method
 * @returns {any}    any    
 */
export interface ReturnableNextPost<T, U> {
    (arg: T, res: U, next: ReturnablePostParams<T, U>): any;
}
