import { combineReducers } from "redux";
import { contactsReducer } from "./contactsReducer";
import { groupsReducer } from "./groupsReducer";
import { favoritesReducer } from "./favoritesReducer";

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
