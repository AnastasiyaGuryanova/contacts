import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto";
import { BASE_URLS, API_ENDPOINTS } from "src/constants/api";

export const contactsApiSlice = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URLS.MOCKI,
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => API_ENDPOINTS.CONTACTS,
    }),
  }),
});
