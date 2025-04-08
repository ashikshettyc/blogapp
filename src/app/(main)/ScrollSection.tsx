import React from 'react';
import Slider from './Slider';
import Link from 'next/link';
interface category {
  name: string;
  slug: string;
}

const ScrollSection = ({ category, categoryData }: { category: category }) => {
  return (
    <section className="">
      <div className="max-w-4xl xl:max-w-7xl mx-auto py-10 border-b-2 border-gray-300">
        <div className="flex flex-col space-y-3  ">
          <div className="flex py-3">
            <div className="relative w-[10%]">
              <Link href={category?.slug ? `/category/${category?.slug}` : '#'}>
                <div className="font-bold text-xl lg:text-2xl absolute translate-y-40 text-gray-500 -rotate-90 origin-top-left">
                  {category?.name}
                </div>
              </Link>
            </div>

            <div className="flex-1 translate-x-16 xl:-translate-x-0">
              <Slider categoryData={categoryData} />
            </div>
          </div>

          <div className="text-end -translate-x-6 xl:-translate-x-20 ">
            <Link
              href={category?.slug ? `/category/${category?.slug}` : '#'}
              className="bg-primary text-white p-2 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
