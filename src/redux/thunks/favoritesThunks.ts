import {
  favoritesRequestStart,
  favoritesRequestSuccess,
  favoritesRequestError,
  AppDispatch,
} from "src/redux/actions";

import { FavoriteContactsDto } from "src/types/dto";
import { DATA_CONTACT } from "src/__data__";

export const fetchFavorites = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(favoritesRequestStart());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockedFavoriteIds: FavoriteContactsDto = [
        DATA_CONTACT[0].id,
        DATA_CONTACT[1].id,
        DATA_CONTACT[2].id,
        DATA_CONTACT[3].id,
      ];

      dispatch(favoritesRequestSuccess(mockedFavoriteIds));
    } catch (err: any) {
      dispatch(favoritesRequestError(err.message));
    }
  };
};
