import { GroupContactsDto } from "src/types/dto";
import { ACTION_TYPE } from "../actions";

interface GroupsState {
  items: GroupContactsDto[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  items: [],
  loading: false,
  error: null,
};

export const groupsReducer = (
  state = initialState,
  action: any
): GroupsState => {
  switch (action.type) {
    case ACTION_TYPE.GROUPS_REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ACTION_TYPE.GROUPS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case ACTION_TYPE.GROUPS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
