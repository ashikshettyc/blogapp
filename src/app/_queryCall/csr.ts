import { gql } from "@apollo/client";
import {mutate, query} from '@/lib/apollo-client';
const UPDATE_BLOG = gql`
  mutation UpdateBlog($documentId: ID!, $data: BlogInput!) {
    updateBlog(documentId: $documentId, data: $data) {
      views
    }
  }
`;

export const updateBlogCount = async (documentId: string, data: unknown) => {
  try {
    const response = await mutate({
      mutation: UPDATE_BLOG,
      variables: {
        documentId,
        data,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Mutation Error:', error);
    throw error;
  }
};


const searchBlogs = gql`
query All_Blogs($filters: BlogFiltersInput) {
  blogs(filters: $filters) {
    title
    slug
    banner {
      url
    }
  }
}
`

export const searchBlogsQuery = async (searchTems:string)=> {
  try {
    const {data} =  await query({
      query:searchBlogs,
      variables:{
        "filters": {
          "title": {
            "containsi": searchTems
          }
        },
        
      }
    })

    return data;
  } catch (error) {
    console.error('search Error:', error);
    throw error;
  }
}