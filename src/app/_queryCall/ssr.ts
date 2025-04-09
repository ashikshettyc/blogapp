import { query  } from '@/lib/apollo-client';
import { ApolloError, gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query AllCategories {
   categories {
    name
    slug
  }
  }
`;

export const fetchCategoriesSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_CATEGORIES,
    });

    if (!data || !data.categories) {
      console.warn('No categories found.');
      return null;
    }

    return data.categories;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL Error while fetching categories:', error.message);
      console.error('GraphQL Errors:', error.graphQLErrors);
      console.error('Network Error:', error.networkError);
      console.error('Extra Error Info:', error.extraInfo);
      return null;
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};


export const Get_ALL_BLOGS = gql`
query Blogs {
  blogs {
    slug
    createdAt
  }
}`

export const fetchAllBlogs = async()=> {
  try {
    const {data} = await query({
      query:Get_ALL_BLOGS,
      fetchPolicy: 'no-cache',
    })
    if (!data) {
      console.warn('No categories found.');
      return null;
    }
    return data.blogs
  } catch (error) {
    if(error instanceof ApolloError){
      console.log('GraphQL Error while fetching all Blogs:', error.message)
      return null;
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
}

export const GET_ALL_TAGS = gql`
query Tags {
  tags {
    slug
  }
}`


export const fetchAllTags = async()=> {
  try {
    const {data} = await query({
      query:GET_ALL_TAGS,
    })
    if (!data) {
      console.warn('No categories found.');
      return null;
    }
    return data.tags
  } catch (error) {
    if(error instanceof ApolloError){
      console.log('GraphQL Error while fetching all Blogs:', error.message)
      return null;
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
}
















export const All_Blogs = gql`
query All_Blogs($pagination: PaginationArg, $sort: [String]) {
    blogs(pagination: $pagination, sort: $sort) {
    createdAt
    categories {
      name
      slug
    }
    banner {
      caption
      url
    }
    slug
    tags {
      name
    }
    title
    updatedAt
    publishedAt
      documentId
      excerpt
      isPopular
      isTrending
      popularSequence
      views
    }
}
`;

export const AllBLogs = async() =>{
  try {
    const { data } = await query({
      query: All_Blogs,    
     variables:{
      sort: ["createdAt:desc"],
      pagination: {
        limit: 10
      }
     },fetchPolicy: 'no-cache'
    });
    
    if (!data || !data.blogs) {
      console.warn('No blogs found.');
      return null;
    }
    return data.blogs

  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL Error while fetching all blogs:', error.message);
      console.error('GraphQL Errors:', error.graphQLErrors);
      console.error('Network Error:', error.networkError);
      console.error('Extra Error Info:', error.extraInfo);
      return null;
    }
    console.error('Unexpected Error:', error);
    throw error;
  }

}


export const tags = gql`
query Tags {
  tags {
    name
    slug
     documentId
    blogs {
      title
    }
  }
}`

export const allTags = async()=> {
  try {
    const {data} = await query({
      query:tags,fetchPolicy: 'no-cache'
    })
    if(!data || !data.tags){
      console.warn('No tags found.');
      return null;
    }
    return data.tags
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL Error while fetching all blogs:', error.message);
  }
  console.error('Unexpected Error:', error);
  throw error;
}
}

export const mostViews = gql`
query Blogs($sort: [String], $pagination: PaginationArg) {
  blogs(sort: $sort, pagination: $pagination) {
    views
    title
    createdAt
    slug
    banner {
      url
    }
    documentId
  }
}`

export const mostViewed = async() =>{
try {
  const {data}= await query({
    query:mostViews,
    variables:{
      sort:["views:desc"],
      pagination: {
        limit: 3
      }
    }
  })
  return data.blogs
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching all blogs:', error.message);
}
console.error('Unexpected Error:', error);
throw error;
}
}

export const CategoryWiseBlogs = gql`
query Blogs {
  categories {
    blogs {
      title
      createdAt
      banner {
        url
      }
      slug
    }
    slug
    name
  }
}`
export const CategoryWiseBlogsQuery = async() =>{
try {
  const {data} = await query({
    query:CategoryWiseBlogs,fetchPolicy: 'no-cache'
  })
  if(!data || !data.categories){
    console.warn('No categories found.');
    return null;
  }
  return data.categories
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching all blogs:', error.message);
}
console.error('Unexpected Error:', error);
throw error;
}
}

export const allRealtedPosts = gql`
query Query($filters: CategoryFiltersInput, $sort: [String], $pagination: PaginationArg) {
  categories(filters: $filters) {
    name
    slug
    blogs(sort: $sort, pagination: $pagination) {
      title
      slug
      createdAt
      banner {
        url
      }
      documentId
      excerpt
    }
  }
}`

export const fetchAllPostsRelatedToCategory = async(categoryslug:string, currentPage:number = 1, pageSize:number = 10 )=>{
try {
  const {data} = await query({
    query:allRealtedPosts,
    variables:
    {
      "filters": {
        "slug": {
          "eqi": categoryslug
        }
      },
      "sort": [
        "createdAt:desc"
      ],
      "pagination": {
        "page": currentPage | 1,
        "pageSize": pageSize | 4
      }
    },fetchPolicy: 'no-cache'  
  })
  if(!data || !data.categories){
    console.warn('No categories found.');
    return null;
  }
  return data.categories
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching all blogs:', error.message);
}
console.error('Unexpected Error:', error);
throw error;
}
}


export const certainBlog = gql`
query Blogs($filters: BlogFiltersInput) {
  blogs(filters: $filters) {
    slug
    title
    views
    createdAt
    documentId
    excerpt
    banner {
      name
      url
    }
    tags {
      name
      slug
    }
    Content {
      ... on ComponentBlogImage {
        Image {
          url
          name
        }
      }
      ... on ComponentBlogTest {
        Test
        id
      }
      ... on Error {
        code
        message
      }
    }
    categories {
      name
      slug
    }
  }
}`

export const fetchSingleBlog = async (blogSlug: string) => {
  try {
    const { data } =  await query({
      query: certainBlog,
      variables: {
        filters: {
          slug: {
            eq: blogSlug,
          },
        },
      },fetchPolicy: 'no-cache'
    });

    if (!data && !data?.blogs) {
      console.warn('No single blog found.');
      return null;
    }

 
    return data?.blogs[0] || null;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL Error while fetching single blog:', error.message);
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};


export const fetchRelatedPosts = gql`
query Blogs($pagination: PaginationArg, $sort: [String], $filters: BlogFiltersInput) {
  blogs(pagination: $pagination, sort: $sort, filters: $filters) {
    slug
    title
    createdAt
    excerpt
    documentId
    banner {
      url
    }
    categories {
      name
    }
  }
}`

export const fetchRelatedPostsQuery = async (blogslug: string, category:string)=>{
  try {
    const {data} = await query({
      query:fetchRelatedPosts,
      variables:
      {
        "pagination": {
          "limit": 3
        },
        "sort": [
          "createdAt:desc"
        ],
        "filters": {
          "categories": {
            "name": {
              "in": category
            }
          },
          "slug": {
            "nei": blogslug
          }
        }, 
      }
      
    })
    return data.blogs
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL Error while fetching single blog:', error.message);
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
}


export const prevQuery = gql`
query Blogs($filters: BlogFiltersInput, $pagination: PaginationArg) {
  blogs(filters: $filters, pagination: $pagination) {
    title
    slug
    createdAt
    banner {
      url
    }
    categories {
      name
    }
  }
}`

export const fetchPrevPost = async (blogslug: string, categoryNames: string,createdAt:string)=>{
try {
  const {data} = await query({
    query: prevQuery,
    variables:
    {
      "filters": {
        "categories": {
          "name": {
            "in": categoryNames
          }
        },
        "createdAt": {
          "lt": createdAt,
        },
        "slug": {
          "nei": blogslug
        }
      },
      "pagination": {
        "limit": 1
      }
    }
  })

  return data.blogs || null
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching single blog:', error.message);
  }
  console.error('Unexpected Error:', error);
  throw error;
}
}

export const nextQuery = gql`
query Blogs($filters: BlogFiltersInput, $pagination: PaginationArg) {
  blogs(filters: $filters, pagination: $pagination) {
    title
    slug
    createdAt
    banner {
      url
    }
    categories {
      name
    }
  }
}`

export const fetchNextPost = async (blogslug: string, categoryNames: string,createdAt:string)=>{
try {
  const {data} = await query({
    query: nextQuery,
    variables:
    {
      "filters": {
        "categories": {
          "name": {
            "in": categoryNames
          }
        },
        "createdAt": {
          "gt": createdAt,
        },
        "slug": {
          "nei": blogslug
        }
      },
      "pagination": {
        "limit": 1
      }
    }
  })

  return data.blogs || null
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching single blog:', error.message);
  }
  console.error('Unexpected Error:', error);
  throw error;
}
}


export const singleTagQuery = gql`
query Tags($sort: [String], $pagination: PaginationArg, $filters: TagFiltersInput) {
  tags(filters: $filters) {
    name
    slug
    documentId
    blogs(sort: $sort, pagination: $pagination) {
      slug
      title
      documentId
      createdAt
      excerpt
      banner {
        url
      }
    }
  }
}`

export const fetchAllPostsRelatedSingleTagQuery = async(slugName:string,currentPage:number = 1, pageSize:number = 10 ) => {
try {
  const {data} = await query({
    query: singleTagQuery,
    variables:{
      "sort": ["createdAt:desc"],
      "pagination": {
        "page": currentPage,
        "pageSize": pageSize
      },
      "filters": {
        "slug": {
          "eqi": slugName
        }
      }
    }  })
  return data.tags
} catch (error) {
  if (error instanceof ApolloError) {
    console.error('GraphQL Error while fetching single blog:', error.message);
  }
  console.error('Unexpected Error:', error);
  throw error;
}
}