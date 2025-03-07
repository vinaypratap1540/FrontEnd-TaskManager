import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice.js";

const BASE_API = "https://backend-taskmanager-n9g2.onrender.com/api/v1/";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Refetch_Creator_Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Authentication Endpoints
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "users/register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "users/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
          dispatch(authApi.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    createTasks: builder.mutation({
      query: ({ title, description, dueDate }) => ({
        url: "users/tasks", 
        method: "POST",
        body: { title, description, dueDate },
      }),
      invalidatesTags: ["Refetch_Creator_Tasks"],
    }),
    getCreatedTask: builder.query({
      query: () => ({
        url: "users/tasks/user",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Tasks"],
    }),
    updateTaskCompletion: builder.mutation({
      query: (taskId) => ({
        url: `users/tasks/${taskId}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["Refetch_Creator_Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `users/tasks/${taskId}`, 
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Tasks"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useCreateTasksMutation,
  useGetCreatedTaskQuery,
  useUpdateTaskCompletionMutation,
  useDeleteTaskMutation,
} = authApi;

