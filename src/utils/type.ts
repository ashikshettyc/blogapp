export interface PageParamsProps {
  params: { [key: string]: string }; 
  searchParams?: { [key: string]: string | string[] | undefined }; 
}




export interface NavCategoryType {
    name:string
    slug:string
}



export interface Category {
    name: string;
    slug: string;
  }
  
  export interface Tag {
    name: string;
  }
  
  export interface Banner {
    caption?: string | null;
    url: string;
  }
  
  export interface Article {
    createdAt: string; 
    updatedAt?: string;
    publishedAt?: string;
    categories?: Category[];
    banner: Banner;
    slug?: string;
    tags?: Tag[];
    title: string;
    documentId?: string;
    excerpt: string;
    isPopular?: boolean;
    isTrending?: boolean;
    popularSequence?: string | null;
    views?: number;

  }
  interface tagblogs{
    title:string
  }
  export interface Tags{
    name:string,
    slug:string,
    documentId:string,
    blogs:tagblogs[]
  }

  export interface mostviewsType{
    views:number,
    title:string,
    createdAt:string,
    slug:string,
    banner: Banner,
    documentId:string,
  }

  export interface CatBlogs{
    documentId?:string,
    slug: string;
    title:string,
    createdAt:string,
    banner:Banner
  }
  export interface CategorySliderType{
    slug:string,
    name:string,
    blogs:CatBlogs[]
  }

  export interface Trends{
    documentId:string,
    banner:Banner,
    slug:string,
    execert:string,
    title:string,
    
  }