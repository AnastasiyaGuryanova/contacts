import { ContactDto } from "src/types/dto";
import { ACTION_TYPE } from "../actions";

interface ContactsState {
  items: ContactDto[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

export const contactsReducer = (
  state = initialState,
  action: any
): ContactsState => {
  switch (action.type) {
    case ACTION_TYPE.CONTACTS_REQUEST_START:
      return { ...state, loading: true, error: null };

    case ACTION_TYPE.CONTACTS_REQUEST_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case ACTION_TYPE.CONTACTS_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
