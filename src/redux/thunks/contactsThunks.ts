import {
  contactsRequestStart,
  contactsRequestSuccess,
  contactsRequestError,
  AppDispatch,
} from "src/redux/actions";

import { DATA_CONTACT } from "src/__data__";

export const fetchContacts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(contactsRequestStart());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(contactsRequestSuccess(DATA_CONTACT));
    } catch (error: any) {
      dispatch(contactsRequestError(error.message));
    }
  };
};
