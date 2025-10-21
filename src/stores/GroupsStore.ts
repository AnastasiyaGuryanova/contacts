import { makeAutoObservable, flow } from "mobx";
import { api } from "src/api";
import { GroupContactsDto } from "src/types/dto";
import { Response, isSuccessResponse } from "src/types/response";

interface GroupsStoreType {
  groups: GroupContactsDto[];
  isLoading: boolean;
  error: string | null;
  fetchGroups: () => Promise<void> & { cancel: () => void };
}

export const groupsStore: GroupsStoreType = makeAutoObservable({
  groups: [] as GroupContactsDto[],
  isLoading: false,
  error: null as string | null,

  fetchGroups: flow(function* (this: typeof groupsStore) {
    this.isLoading = true;
    this.error = null;

    try {
      const result: Response<GroupContactsDto[]> = yield api.getGroups();

      if (isSuccessResponse(result)) {
        this.groups = result.data;
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
