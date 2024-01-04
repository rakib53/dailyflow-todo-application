import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "api/registration",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "api/login",
        method: "POST",
        body: data,
      }),
    }),
    loginWithGoogle: builder.mutation({
      query: (body) => ({
        url: "api/googleLogin",
        method: "POST",
        body: body,
      }),
    }),
    getUserInfo: builder.query({
      query: () => "api/userInfo",
    }),
  }),
});

export const {
  useRegistrationMutation,
  useSignInMutation,
  useLoginWithGoogleMutation,
  useGetUserInfoQuery,
} = authApi;
