import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API } from '../../config';
import type { WorkLog, WorkLogCreateDto } from '../../types';

const baseUrl = import.meta.env.VITE_API_URL;

const tagTypes = ['WorkLog'];
const baseQuery = fetchBaseQuery({ baseUrl });

export const workLogApi = createApi({
  tagTypes,
  baseQuery,
  reducerPath: 'workLogApi',
  endpoints: (builder) => ({
    list: builder.query<WorkLog[], string | undefined>({
      providesTags: tagTypes,
      query: (date) => ({
        method: 'GET',
        url: API.GET_WORK_LOGS,
        params: date ? { date } : undefined,
      }),
    }),

    create: builder.mutation<WorkLog, WorkLogCreateDto>({
      invalidatesTags: tagTypes,
      query: (body) => ({
        body,
        method: 'POST',
        url: API.GET_WORK_LOGS,
      }),
    }),

    update: builder.mutation<
      WorkLog,
      Partial<WorkLogCreateDto> & { id: string }
    >({
      invalidatesTags: tagTypes,
      query: ({ id, ...body }) => ({
        body,
        method: 'PATCH',
        url: API.UPDATE_WORK_LOGS.replace(':id', id),
      }),
    }),

    delete: builder.mutation<void, string>({
      invalidatesTags: tagTypes,
      query: (id: string) => ({
        method: 'DELETE',
        url: API.UPDATE_WORK_LOGS.replace(':id', id),
      }),
    }),
  }),
});

export const {
  useListQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = workLogApi;
