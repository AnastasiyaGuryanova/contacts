import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites";
import {
  contactsReduser,
  contactsReduserPath,
  contactsMiddleware,
} from "./contacts";
import { groupsReduser, groupsReduserPath, groupsMiddleware } from "./groups";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [contactsReduserPath]: contactsReduser,
    [groupsReduserPath]: groupsReduser,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([contactsMiddleware, groupsMiddleware]),

  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
