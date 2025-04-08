import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { fetchAllPostsRelatedToCategory } from '@/app/_queryCall/ssr';
import { BASE_URL, WEBSITE_URL } from '@/utils/envStore';
import { formatPublishedDate } from '@/utils/dateSorter';
import { notFound } from 'next/navigation';
import { Article } from '@/utils/type';

export async function generateMetadata({ params }) {
  const { categoryslug } = await params;

  const fetchPostsRelatedToCategory = await fetchAllPostsRelatedToCategory(
    categoryslug
  );

  return {
    title: fetchPostsRelatedToCategory[0]?.name,
    openGraph: {
      title: fetchPostsRelatedToCategory[0]?.name,
    },
    alternates: {
      canonical: `${WEBSITE_URL}/category/${fetchPostsRelatedToCategory[0]?.slug}`,
    },
  };
}

const Page = async ({ params, searchParams }) => {
  const { categoryslug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt((await page) || 1, 10);
  const pageSize = 6;

  const fetchPostsRelatedToCategory = await fetchAllPostsRelatedToCategory(
    categoryslug,
    currentPage,
    pageSize
  );

  if (
    !fetchPostsRelatedToCategory ||
    fetchPostsRelatedToCategory.length === 0
  ) {
    notFound();
  }

  const hasMore = fetchPostsRelatedToCategory[0]?.blogs?.length === pageSize;

  return (
    <Layout>
      <main className="max-w-5xl mx-auto pt-14">
        <div className="text-center py-9">
          <p className="text-xs text-gray-400 uppercase">Browsing Category</p>
          <h1 className="text-4xl text-[#333333] uppercase">
            {fetchPostsRelatedToCategory[0]?.name}
          </h1>
        </div>
        <div className="container">
          {fetchPostsRelatedToCategory.map((blog: unknown) =>
            blog?.blogs?.map((singleBlog: Article) => (
              <div
                className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-8 border-b-2 px-2 md:px-10 xl:px-0 items-center mx-auto border-gray-300 py-5 my-5"
                key={singleBlog?.documentId}
              >
                <div className="flex-1 aspect-square md:aspect-auto md:w-full md:h-[325px] xl:h-[290px]">
                  <Link href={singleBlog?.slug ? `/${singleBlog?.slug}` : '#'}>
                    <Image
                      src={`${BASE_URL}${singleBlog?.banner?.url}`}
                      width={600}
                      height={600}
                      alt={singleBlog?.documentId}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                <div className="flex-1 space-y-5">
                  <p className="uppercase text-xs font-light pb-1 border-b-2 w-fit border-gray-400 mb-3">
                    {fetchPostsRelatedToCategory[0]?.name}
                  </p>
                  <Link href={singleBlog?.slug ? `/${singleBlog?.slug}` : '#'}>
                    <h3 className="uppercase text-2xl text-primary font-semibold pb-2">
                      {singleBlog?.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 pb-4">
                    {singleBlog?.excerpt.substring(0, 200) + '...'}
                  </p>
                  <Link
                    href={singleBlog?.slug ? `/${singleBlog?.slug}` : '#'}
                    className="text-sm uppercase font-light"
                  >
                    Read More
                  </Link>
                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{formatPublishedDate(singleBlog?.createdAt)}</span> -{' '}
                    <span className="uppercase">
                      {fetchPostsRelatedToCategory[0]?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center my-10 space-x-2 ">
          {currentPage > 1 && (
            <Link
              href={`?page=${currentPage - 1}`}
              className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300 shadow-md"
            >
              ← Previous
            </Link>
          )}
          <span className="px-6 py-3 rounded-full bg-primary text-white shadow-md">
            {currentPage}
          </span>
          {hasMore && (
            <Link
              href={`?page=${currentPage + 1}`}
              className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300 shadow-md"
            >
              Next →
            </Link>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Page;
