import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupContactsDto } from "src/types/dto";
import { BASE_URLS, API_ENDPOINTS } from "src/constants/api";

export const groupsApiSlice = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URLS.MOCKI,
  }),
  endpoints: (builder) => ({
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => API_ENDPOINTS.GROUPS,
    }),
  }),
});
