import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice.js";

const USER_API = "https://backend-taskmanager-n9g2.onrender.com/api/v1/users/"
export const authApi = createApi({
     reducerPath:"authApi",
     tagTypes:["Refetch_Creator_Tasks"],
     baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
     }),
     endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                   const result = await queryFulfilled;
                   dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
               try {
                 dispatch(userLoggedOut())
               } catch (error) {
                console.log(error)
               }
            }
        }),
        getUserProfile:builder.query({
            query:()=>({
              url:"me",
              method:"GET"
            }),
         async onQueryStarted(_,{queryFulfilled,dispatch}){
            try{
               const result = await queryFulfilled;
               dispatch(userLoggedIn({user:result.data.user}))
            }catch(error){
                console.log(error)
            }
         }
        }),
        createTasks:builder.mutation({
            query:({title,description,dueDate})=>({
                url:"tasks",
                method:"POST",
                body:{title,description,dueDate}
            }),
            invalidatesTags:['Refetch_Creator_Tasks']
        }),
        getCreatedTask:builder.query({
            query:()=>({
                url:"tasks/user",
                method:"GET"
            }),
            providesTags:['Refetch_Creator_Tasks']
        }),
        updateTaskCompletion:builder.mutation({
            query:(taskId)=>({
                url:`tasks/${taskId}`,
                method:"PATCH",
                body:{}
            }),
            invalidatesTags: ["Refetch_Creator_Tasks"],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Refetch_Creator_Tasks"], //Refresh task list after deletion
        }),
     }),
})

export const {useRegisterUserMutation,useLoginUserMutation,
             useLogoutUserMutation,useGetUserProfileQuery,
             useCreateTasksMutation,useGetCreatedTaskQuery,useUpdateTaskCompletionMutation,
              useDeleteTaskMutation} = authApi