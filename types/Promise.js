// @flow
export type ResolveFn<T> = (value: T) => void;
export type RejectFn = (err: Error) => void;
