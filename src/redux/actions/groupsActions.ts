import { ACTION_TYPE, Action } from "./action-type";

export const groupsRequestStart = (): Action<
  typeof ACTION_TYPE.GROUPS_REQUEST_START
> => ({
  type: ACTION_TYPE.GROUPS_REQUEST_START,
});

export const groupsRequestSuccess = (
  groups: any
): Action<typeof ACTION_TYPE.GROUPS_REQUEST_SUCCESS, any> => ({
  type: ACTION_TYPE.GROUPS_REQUEST_SUCCESS,
  payload: groups,
});

export const groupsRequestError = (
  error: string
): Action<typeof ACTION_TYPE.GROUPS_REQUEST_ERROR, string> => ({
  type: ACTION_TYPE.GROUPS_REQUEST_ERROR,
  payload: error,
});
