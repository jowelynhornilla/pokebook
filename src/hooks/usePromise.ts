import { useReducer } from "react";

import {
  PromiseAction,
  PromiseState,
  PromiseStatus,
  UsePromiseParams,
} from "./types/usePromise.types";

const promiseReducer = <P>(
  state: PromiseState<P>,
  action: PromiseAction<P>
) => {
  const { type, payload } = action;
  switch (type) {
    case PromiseStatus.PENDING:
      return {
        ...state,
        rejected: false,
        pending: true,
        fulfilled: false,
      };
    case PromiseStatus.FULFILLED:
      return {
        ...state,
        rejected: false,
        pending: false,
        fulfilled: true,
        result: payload,
      };
    case PromiseStatus.REJECTED:
      return {
        ...state,
        pending: false,
        fulfilled: false,
        rejected: true,
        reason: payload,
      };
    default:
      return state;
  }
};

export const usePromise = <T = any, P = any>({
  promiseFunction,
}: UsePromiseParams<T, P>) => {
  const [promiseState, dispatch] = useReducer(promiseReducer<P>, {
    pending: false,
    rejected: false,
    fulfilled: false,
    reason: null,
    result: null,
  });

  const call = async (params: T) => {
    dispatch({
      type: PromiseStatus.PENDING,
    });
    promiseFunction(params).then(
      (result) => {
        dispatch({
          type: PromiseStatus.FULFILLED,
          payload: result,
        });
        return result;
      },
      (error) => {
        dispatch({
          type: PromiseStatus.REJECTED,
          payload: error,
        });
        throw error;
      }
    );
  };

  return {
    ...promiseState,
    call,
  };
};
