import { ACTION_TYPE, Action } from "./action-type";

export const contactsRequestStart = (): Action<
  typeof ACTION_TYPE.CONTACTS_REQUEST_START
> => ({
  type: ACTION_TYPE.CONTACTS_REQUEST_START,
});

export const contactsRequestSuccess = (
  contacts: any
): Action<typeof ACTION_TYPE.CONTACTS_REQUEST_SUCCESS, any> => ({
  type: ACTION_TYPE.CONTACTS_REQUEST_SUCCESS,
  payload: contacts,
});

export const contactsRequestError = (
  error: string
): Action<typeof ACTION_TYPE.CONTACTS_REQUEST_ERROR, string> => ({
  type: ACTION_TYPE.CONTACTS_REQUEST_ERROR,
  payload: error,
});
