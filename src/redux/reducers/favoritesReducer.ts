import { ACTION_TYPE } from "../actions";

interface FavoritesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

export const favoritesReducer = (
  state = initialState,
  action: any
): FavoritesState => {
  switch (action.type) {
    case ACTION_TYPE.FAVORITES_REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION_TYPE.FAVORITES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case ACTION_TYPE.FAVORITES_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // добавлять/удалять вручную
    // case ACTION_TYPE.FAVORITES_ADD_CONTACT_ID:
    //   return {
    //     ...state,
    //     items: [...state.items, action.payload],
    //   };

    // case ACTION_TYPE.FAVORITES_REMOVE_CONTACT_ID:
    //   return {
    //     ...state,
    //     items: state.items.filter(id => id !== action.payload),
    //   };

    default:
      return state;
  }
};
