// @flow
export type Resolve<T> = (value: T) => void;
export type Reject = (err: Error) => void;
