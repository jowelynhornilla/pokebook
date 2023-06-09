export interface UsePromiseParams<T, P> {
  promiseFunction: (args?: T | null) => Promise<P>;
}

export enum PromiseStatus {
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  INITIAL = "INITIAL",
}

export interface PromiseAction<P> {
  type: PromiseStatus;
  payload?: P | null;
}

export interface PromiseState<P> {
  result?: P | null;
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
  reason: any;
}
