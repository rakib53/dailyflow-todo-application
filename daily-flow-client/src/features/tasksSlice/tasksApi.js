import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: ({ userId }) => ({
        url: `api/getTask/user/${userId}`,
      }),
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "api/addTask",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ userId, ...arg }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTask", { userId }, (draft) => {
            draft.tasks.push(arg);
          })
        );
        try {
          const completeFetching = await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    editTask: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "api/editTask",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getTasks"],
      // async onQueryStarted({ taskId, data }, { dispatch, queryFulfilled }) {
      //   const { userId } = data;
      //   const editTask = dispatch(
      //     tasksApi.util.updateQueryData("getTask", { userId }, (draft) => {
      //       const isTasks = draft.tasks.map((task) => {
      //         if (task?._id === taskId) {
      //           task = data;
      //         } else {
      //           return task;
      //         }
      //       });
      //       console.log(isTasks);
      //       draft.tasks = isTasks;
      //     })
      //   );
      //   try {
      //     const editedTask = await queryFulfilled;
      //   } catch (error) {
      //     editTask.undo();
      //   }
      // },
    }),
    updateTaskStatus: builder.mutation({
      query: (data) => {
        return {
          url: `api/updateTaskStatus`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(
        { userId, taskId, status },
        { dispatch, queryFulfilled }
      ) {
        const editedTaskStatus = dispatch(
          tasksApi.util.updateQueryData("getTask", { userId }, (draft) => {
            const isTasks = draft.tasks.find((task) => {
              return task?._id === taskId;
            });
            isTasks.status = status;
          })
        );
        try {
          const changesTaskStaus = await queryFulfilled;
        } catch (error) {
          editedTaskStatus.undo();
        }
      },
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
      query: (data) => {
        console.log(data);
        return {
          url: `api/deleteTask`,
          method: "DELETE",
          body: data,
        };
      },
      async onQueryStarted({ userId, taskId }, { dispatch, queryFulfilled }) {
        const deleteTask = dispatch(
          tasksApi.util.updateQueryData("getTask", { userId }, (draft) => {
            const isTasks = draft.tasks.filter((task) => {
              return task?._id !== taskId;
            });
            draft.tasks = isTasks;
          })
        );
        try {
          const deletedTask = await queryFulfilled;
        } catch (error) {
          deleteTask.undo();
        }
      },
    }),
    deleteSubTask: builder.mutation({
      query: (data) => ({
        url: `api/deleteSubTask`,
        method: "DELETE",
        body: data,
      }),
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
