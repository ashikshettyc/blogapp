import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { notFound } from 'next/navigation';
import {
  AllBLogs,
  fetchNextPost,
  fetchPrevPost,
  fetchRelatedPostsQuery,
  fetchSingleBlog,
} from '../_queryCall/ssr';
import { BASE_URL, WEBSITE_URL } from '@/utils/envStore';
import { formatPublishedDate } from '@/utils/dateSorter';
import { updateBlogCount } from '../_queryCall/csr';
import Script from 'next/script';
import { CatBlogs, Trends } from '@/utils/type';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogslug: string }>;
}): Promise<Metadata> {
  const { blogslug } = await params;
  const fetchSingleBlogPost = await fetchSingleBlog(blogslug);

  return {
    title: fetchSingleBlogPost?.title,
    description: fetchSingleBlogPost?.excerpt,
    openGraph: {
      title: fetchSingleBlogPost?.title,
      description: fetchSingleBlogPost?.excerpt?.slice(0, 160),
      url: `${fetchSingleBlogPost?.slug}`,
      images: [
        {
          url: `${BASE_URL}${fetchSingleBlogPost?.banner.url}`,
          width: 800,
          height: 600,
          alt: fetchSingleBlogPost?.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fetchSingleBlogPost?.title,
      description: fetchSingleBlogPost?.excerpt,
      site: '@FollowCII',
      images: `${BASE_URL}${fetchSingleBlogPost?.banner.url}`,
    },
    alternates: {
      canonical: `${WEBSITE_URL}/${fetchSingleBlogPost?.slug}`,
    },
  };
}

const page = async ({ params }: { params: Promise<{ blogslug: string }> }) => {
  const { blogslug } = await params;
  const recentBlogs = await AllBLogs();
  const fetchSingleBlogPost = await fetchSingleBlog(blogslug);
  if (!fetchSingleBlogPost || fetchSingleBlogPost.length === 0) {
    notFound();
  }
  const categoryNames =
    fetchSingleBlogPost?.categories?.map((cat: { name: string }) => cat.name) ||
    [];
  const createdAt = fetchSingleBlogPost?.createdAt;
  const fetchRelatedBlogPosts = await fetchRelatedPostsQuery(
    blogslug,
    categoryNames
  );

  const fetchPrevPosts = await fetchPrevPost(
    blogslug,
    categoryNames,
    createdAt
  );

  const fetchNextPosts = await fetchNextPost(
    blogslug,
    categoryNames,
    createdAt
  );
  await updateBlogCount(fetchSingleBlogPost?.documentId, {
    views: fetchSingleBlogPost?.views + 1,
  });
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fetchSingleBlogPost.title,
    description: fetchSingleBlogPost.description,
    datePublished: fetchSingleBlogPost.createdAt,
    publisher: {
      '@type': 'Organization',
      name: 'CII',
      logo: {
        '@type': 'ImageObject',
        url: `${WEBSITE_URL}/cii-logo.png`,
      },
    },
    image: fetchSingleBlogPost.banner?.url
      ? `${BASE_URL}/${fetchSingleBlogPost.banner.url}`
      : 'https://yourdomain.com/default-image.jpg',
    url: `${WEBSITE_URL}/${fetchSingleBlogPost.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${WEBSITE_URL}/${fetchSingleBlogPost.slug}`,
    },
  };

  return (
    <Layout>
      {/* JSON-LD Schema Injection */}
      <Script
        id="json-ld-blog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <section>
        {fetchPrevPosts && fetchPrevPosts.length > 0 && (
          <div className="hidden md:inline md:fixed top-1/2 tracking-wide group">
            <p className="-rotate-90 bg-white px-3 py-1 -translate-x-8 flex z-10">
              PREV POST
            </p>
            <div className="absolute top-0 -left-6 transform  -translate-y-16 -translate-x-10 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-in-out -z-10  bg-white">
              <Link href={`/${fetchPrevPosts?.[0].slug}`}>
                <div className="w-[280px] h-[188px] flex justify-start flex-col items-end border-2 p-5 pl-28 space-y-3 ">
                  <div className="w-[165px] h-[100px] ">
                    <Image
                      src={`${BASE_URL}${fetchPrevPosts?.[0].banner?.url}`}
                      alt="Image"
                      width={1800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base w-[165px]">
                    {fetchPrevPosts?.[0].title.substring(0, 30)}...
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
        {fetchNextPosts && fetchNextPosts?.length > 0 && (
          <div className="hidden md:inline fixed top-1/2 right-0 tracking-wide group z-20">
            <p className="rotate-90 translate-x-8 bg-white px-3 py-1">
              NEXT POST
            </p>
            <div className="absolute top-0 -right-6 transform  -translate-y-16 translate-x-10 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-in-out -z-10  bg-white">
              <Link href={`/${fetchNextPosts?.[0].slug}`}>
                <div className="w-[280px] h-[188px] flex justify-end flex-col items-start border-2 p-5 pr-28 space-y-3 ">
                  <div className="w-[165px] h-[100px] ">
                    <Image
                      src={`${BASE_URL}${fetchNextPosts?.[0].banner?.url}`}
                      alt="Image"
                      width={1800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base w-[165px]">
                    {fetchNextPosts?.[0].title.substring(0, 20)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto pt-14 ">
          <div className="text-center py-9 flex justify-center flex-col items-center space-y-5 px-2 md:px-5 xl:px-0">
            <p className="text-xs border-b-2 border-gray-500 pb-1 w-fit uppercase">
              {fetchSingleBlogPost?.categories
                .map((cat: { name: string }) => cat?.name)
                .join(', ')}
            </p>
            <h1 className="text-primary font-bold text-2xl pb-5">
              {fetchSingleBlogPost?.title}
            </h1>
            {fetchSingleBlogPost?.banner?.url && (
              <div className="w-full h-full">
                <Image
                  src={`${BASE_URL}${fetchSingleBlogPost?.banner.url}`}
                  alt={fetchSingleBlogPost?.title}
                  width={1800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between gap-x-5 min-h-screen">
              <div
                className="flex-1 text-start w-[90%] mx-auto xl:w-[900px]"
                dangerouslySetInnerHTML={{
                  __html: fetchSingleBlogPost?.Content.map(
                    (post: { Test: string }) => post.Test
                  ),
                }}
              />

              {/* Sticky Section */}
              <div className="md:w-[300px] px-1 md:px-0 xl:sticky xl:top-48 self-start">
                <h4 className="text-xl pb-10">Latest Post</h4>
                <div className="md:w-[300px]">
                  {recentBlogs.slice(0, 4).map((trends: Trends) => (
                    <div
                      className="flex flex-col border-2 mb-5"
                      key={trends.documentId}
                    >
                      <Link href={`/${trends.slug}`}>
                        <div className="md:w-[300px] h-[150px]">
                          <Image
                            src={`${BASE_URL}${trends?.banner.url}`}
                            alt={trends.slug}
                            width={1800}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="text-start p-4 space-y-1">
                        <Link href={`/${trends.slug}`}>
                          <p className="font-bold text-base text-primary">
                            {trends.title}
                          </p>
                        </Link>
                        <p className="text-sm">{trends.execert}</p>
                        <Link
                          href={`/${trends.slug}`}
                          className="text-xs text-primary"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center flex gap-x-3 justify-center items-center pb-5 ">
            <span>{formatPublishedDate(fetchSingleBlogPost?.createdAt)}</span>-{' '}
            <span className=" uppercase">
              {fetchSingleBlogPost?.categories
                .map((cat: { name: string }) => cat?.name)
                .join(', ')}
            </span>
          </div>
          <div className="md:hidden flex justify-between text-sm mx-2 py-8 border-t-2 ">
            {fetchPrevPosts && fetchPrevPosts?.length > 0 && (
              <Link href={`/${fetchPrevPosts?.[0].slug}`}>
                <button>PREV POST</button>
              </Link>
            )}
            {fetchNextPosts && fetchNextPosts?.length > 0 && (
              <Link href={`/${fetchNextPosts?.[0].slug}`}>
                <button>NEXT POST</button>
              </Link>
            )}
          </div>
          <div className="text-center my-10 flex flex-col justify-center items-center px-2 md:px-5">
            <p className=" uppercase text-lg">Related Posts</p>
            <div className="w-[50px] p-[0.5px] text-center bg-gray-600 my-2"></div>
            <div className="grid md:grid-cols-3  gap-10 pt-5">
              {fetchRelatedBlogPosts.map((blog: CatBlogs) => (
                <div
                  className=' className="flex flex-col gap-3 px-1'
                  key={blog.documentId}
                >
                  <Link href={`/${blog.slug}`}>
                    <div className="w-full h-[150px]">
                      <Image
                        src={`${BASE_URL}${blog?.banner.url}`}
                        alt="image"
                        width={240}
                        height={140}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="space-y-2  text-primary text-center md:block flex justify-center items-center flex-col md:text-start">
                    <p className=" text-lg md:text-xs xl:text-sm font-semibold text-wrap">
                      {blog.title}
                    </p>
                    <p className=" text-[12px]">
                      {formatPublishedDate(blog?.createdAt)}
                    </p>
                    {/* <p>{blog.categories}</p> */}
                    <Link href={`/${blog.slug}`}>
                      <p className=" text-[12px]  w-fit border-b-[1px] border-primary ">
                        Read More
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
