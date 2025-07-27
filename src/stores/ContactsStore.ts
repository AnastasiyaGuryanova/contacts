import { makeAutoObservable, flow } from "mobx";
import { api } from "src/api";
import { ContactDto } from "src/types/dto";
import { Response, isSuccessResponse } from "src/types/response";

interface ContactsStoreType {
  contacts: ContactDto[];
  isLoading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void> & { cancel: () => void };
}

export const contactsStore: ContactsStoreType = makeAutoObservable({
  contacts: [] as ContactDto[],
  isLoading: false,
  error: null as string | null,

  fetchContacts: flow(function* (this: typeof contactsStore) {
    this.isLoading = true;
    this.error = null;

    try {
      const result: Response<ContactDto[]> = yield api.getContacts();

      if (isSuccessResponse(result)) {
        this.contacts = result.data;
      } else {
        throw new Error(result.error || "Неизвестная ошибка");
      }
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }),
});
