import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "localhost:3000/"}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ()=> 'api/posts'
          }),

        getPostById: builder.query({
            query:(id)=>'api/posts/'+id
        }),
        
        addPost: builder.mutation({
            query:(body)=>({
                url:'api/posts',
                method:"POST",
                body:body
            })
        }),

        deletePost:builder.mutation({
            query:(id)=>({
                url:'api/posts/'+id,
                method:'DELETE'
            })
        }),
        editPost : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/posts/'+id,
                    method:"PUT",
                    body
                }
            }
        })



    }),
})

export const {
    useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation, 
    useDeletePostMutation, useEditPostMutation
    

} = api