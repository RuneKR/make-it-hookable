export interface ReturnablePre<T> {
    (arg: T, next: ReturnablePre<T>): any;
}
