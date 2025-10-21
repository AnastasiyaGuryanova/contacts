import { makeAutoObservable, reaction } from "mobx";
import { ContactDto } from "src/types/dto";
import { contactsStore } from "./ContactsStore";

export const favoritesStore = makeAutoObservable({
  favorites: [] as ContactDto[],

  updateFavorites() {
    const favoriteIndexes = ["1", "2", "3", "4"];
    if (contactsStore.contacts.length > 0) {
      this.favorites = favoriteIndexes
        .map((index) => contactsStore.contacts[Number(index)])
        .filter(Boolean);
    }
  },
});

reaction(
  () => contactsStore.contacts.slice(),
  () => {
    favoritesStore.updateFavorites();
  }
);
