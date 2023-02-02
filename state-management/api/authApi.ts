import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../config/axiosBaseQuery";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authCheckApi = createApi({
  reducerPath: "authCheckApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}/`,
  }),

  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (data) => {
        return {
          url: "auth",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { id: data.userId }, // appended here
          credentials: "include",
        };
      },
    }),

    // verifyEmail: builder.mutation<>({}),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignUpUserMutation, useLogoutUserMutation } = authCheckApi;
