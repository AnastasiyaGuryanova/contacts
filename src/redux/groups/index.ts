import { groupsApiSlice } from "./api";

export const groupsReduser = groupsApiSlice.reducer;
export const groupsReduserPath = groupsApiSlice.reducerPath;
export const groupsMiddleware = groupsApiSlice.middleware;

export const { useGetGroupsQuery } = groupsApiSlice;
