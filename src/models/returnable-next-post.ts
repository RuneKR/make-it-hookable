export interface ReturnableNextPost<T, U> {
    (arg: T, res: U, next: ReturnableNextPost<T, U>): any;
}
