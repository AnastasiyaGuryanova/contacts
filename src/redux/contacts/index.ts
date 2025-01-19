import { contactsApiSlice } from "./api";

export const contactsReduser = contactsApiSlice.reducer;
export const contactsReduserPath = contactsApiSlice.reducerPath;
export const contactsMiddleware = contactsApiSlice.middleware;

export const { useGetContactsQuery } = contactsApiSlice;
