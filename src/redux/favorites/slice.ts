import { createSlice } from "@reduxjs/toolkit";
import { ContactDto } from "src/types/dto";
import { contactsApiSlice } from "../contacts/api";

interface FavoritesState {
  items: ContactDto[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoriteIndexes = ["1", "2", "3", "4"];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      contactsApiSlice.endpoints.getContacts.matchFulfilled,
      (state, action) => {
        state.items = favoriteIndexes
          .map((index) => action.payload[Number(index)])
          .filter(Boolean);
      }
    );
  },
});
