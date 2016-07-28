/**
 * Parameters accepted by the next function in pre hooks
 * @params  {T}      arg    input to the hookable method
 * @returns {any}    any    
 */
export interface ReturnablePreParams<T> {
    (arg: T): any;
}

/**
 * The parameters given to pre type hooks
 * @params  {T}      arg    input to the hookable method
 * @returns {any}    any    
 */
export interface ReturnableNextPre<T> {
    (arg: T, next: ReturnableNextPre<T>): any;
}
