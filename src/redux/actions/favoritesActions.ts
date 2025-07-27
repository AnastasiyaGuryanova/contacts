import { ACTION_TYPE, Action } from "./action-type";

export const favoritesRequestStart = (): Action<
  typeof ACTION_TYPE.FAVORITES_REQUEST_START
> => ({
  type: ACTION_TYPE.FAVORITES_REQUEST_START,
});

export const favoritesRequestSuccess = (
  favorites: string[]
): Action<typeof ACTION_TYPE.FAVORITES_REQUEST_SUCCESS, string[]> => ({
  type: ACTION_TYPE.FAVORITES_REQUEST_SUCCESS,
  payload: favorites,
});

export const favoritesRequestError = (
  error: string
): Action<typeof ACTION_TYPE.FAVORITES_REQUEST_ERROR, string> => ({
  type: ACTION_TYPE.FAVORITES_REQUEST_ERROR,
  payload: error,
});

//экшены для добавления/удаления
// export const addFavorite = (contactId: string): Action<typeof ACTION_TYPE.FAVORITES_ADD_CONTACT_ID, string> => ({
//   type: ACTION_TYPE.FAVORITES_ADD_CONTACT_ID,
//   payload: contactId,
// });

// export const removeFavorite = (contactId: string): Action<typeof ACTION_TYPE.FAVORITES_REMOVE_CONTACT_ID, string> => ({
//   type: ACTION_TYPE.FAVORITES_REMOVE_CONTACT_ID,
//   payload: contactId,
// });
