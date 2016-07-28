export interface ReturnableNextPre<T> {
    (arg: T, next: ReturnableNextPre<T>): any;
}
