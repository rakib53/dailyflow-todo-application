import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: "api/addTask",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    editTask: builder.mutation({
      query: (data) => ({
        url: "api/editTask",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    getTask: builder.query({
      query: ({ userId }) => ({
        url: `api/getTask/user/${userId}`,
      }),
      providesTags: ["getTasks"],
    }),
    updateTaskStatus: builder.mutation({
      query: (data) => ({
        url: `api/updateTaskStatus`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    updateSubTaskStatus: builder.mutation({
      query: (data) => ({
        url: `api/updateSubTaskStatus`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `api/deleteTask`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["getTasks"],
    }),
    deleteSubTask: builder.mutation({
      query: (data) => ({
        url: `api/deleteSubTask`,
        method: "DELETE",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const userId = arg?.userId;
        const result = dispatch(
          apiSlice.util.updateQueryData("getTask", userId, (draft) => {
            console.log("Hello world!");
          })
        );
        try {
          console.log("ahead of fullfilled query");
          await queryFulfilled;
          console.log("query is fullfilled");
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["getTasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTaskQuery,
  useEditTaskMutation,
  useUpdateSubTaskStatusMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useDeleteSubTaskMutation,
} = tasksApi;
// const task = draft.find((task) => task.userId === userId);
// if (task) {
//   task.tasks = task.tasks.filter(
//     (subtask) => subtask?._id !== arg?.subTaskId
//   );
// }
