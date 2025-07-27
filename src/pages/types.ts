import { State } from "src/types/common";
import {
  ContactDto,
  FavoriteContactsDto,
  GroupContactsDto,
} from "src/types/dto";

export interface CommonPageProps {
  contactsState: State<ContactDto[]>;
  favoriteContactsState: State<FavoriteContactsDto>;
  groupContactsState: State<GroupContactsDto[]>;
}
