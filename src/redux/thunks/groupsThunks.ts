import {
  groupsRequestStart,
  groupsRequestSuccess,
  groupsRequestError,
  AppDispatch,
} from "src/redux/actions";
import { GroupContactsDto } from "src/types/dto";

import { DATA_GROUP_CONTACT } from "src/__data__";

export const fetchGroups = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(groupsRequestStart());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: GroupContactsDto[] = DATA_GROUP_CONTACT;

      dispatch(groupsRequestSuccess(data));
    } catch (err: any) {
      dispatch(groupsRequestError(err.message));
    }
  };
};
