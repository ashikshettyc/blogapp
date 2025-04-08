import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Article, Tags } from '@/utils/type';
import { BASE_URL } from '@/utils/envStore';
import { formatPublishedDate } from '@/utils/dateSorter';
interface Section2Props {
  allBlogs: Article[];
  allTag: Tags[];
}

const Section2 = ({ allBlogs, allTag }: Section2Props) => {
  const popularTag = allTag
    .map((tag) => ({
      ...tag,
      TagCount: Array.isArray(tag.blogs) ? tag.blogs.length : 0,
    }))
    .sort((a, b) => b.TagCount - a.TagCount);

  return (
    <section>
      <div className="container max-w-4xl lg:max-w-7xl mx-auto py-6 px-4 lg:px-0 ">
        <div className="flex flex-col md:flex-row justify-center gap-7">
          <div className="grid md:grid-cols-3 gap-5 xl:w-[75%] ">
            {allBlogs.slice(0, 6).map((blog) => (
              <div
                className="relative group h-[190px] md:w-[185px] md:h-[140px] xl:w-[286px] xl:h-44"
                key={blog.documentId}
              >
                <Link
                  href={blog?.slug ? `${blog.slug}` : '#'}
                  className=" cursor-pointer "
                >
                  {/* Overlay div that will appear on hover */}
                  <div className="absolute inset-0 flex flex-col items-center text-white justify-center bg-primary bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className=" text-center text-md font-semibold px-1 ">
                      {blog.title}
                    </p>
                    <p className="text-xs">
                      {formatPublishedDate(blog?.createdAt)}
                    </p>
                  </div>

                  {/* Image */}

                  <Image
                    src={`${BASE_URL}${blog.banner.url}`}
                    alt={blog.title}
                    width={400}
                    height={170}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="md:w-[25%] space-y-5">
            {/* heading */}
            <div className="">
              <Image
                src="/banner/banner1.png"
                width={200}
                height={150}
                alt="cii banner"
                className="w-full"
              />
            </div>
            {/* tags */}
            <div className="space-y-5">
              <p className=" font-semibold text-primary">Trending Topics</p>
              <div className="flex gap-2 flex-wrap">
                {popularTag?.slice(0, 15).map((tag) => (
                  <Link href={`/tags/${tag.slug}`} key={tag.documentId}>
                    <p className="border border-primary py-2 px-1 w-fit text-sm text-primary font-semibold">
                      {tag.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
