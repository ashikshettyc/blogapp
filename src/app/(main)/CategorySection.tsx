import React from 'react';
import ScrollSection from './ScrollSection';
import Image from 'next/image';
import { CategorySliderType } from '@/utils/type';
import Link from 'next/link';
interface catBlogType {
  categoryWiseBlog: CategorySliderType[];
}
const CategorySection = async ({ categoryWiseBlog }: catBlogType) => {
  return (
    <div className="container xl:max-w-7xl max-w-4xl md:h-[650px] xl:h-[800px] py-6 mx-auto md:overflow-hidden mb-10  px-4 lg:px-0">
      <div className="flex flex-col md:flex-row justify-center gap-x-5">
        {/* Left Scrollable Section */}
        <div className="md:w-[70%] xl:w-[75%] overflow-y-auto overflow-x-hidden max-h-[650px] xl:max-h-[750px] no-scrollbar">
          <div className="space-y-5">
            {categoryWiseBlog?.map((category) => (
              <ScrollSection
                category={category}
                categoryData={category}
                key={category.name}
              />
            ))}
          </div>
        </div>

        {/* Right Scrollable Image Section */}
        <div className="md:w-[30%] xl:w-[25%]  md:max-h-[650px] xl:max-h-[800px] no-scrollbar">
          <div className="pt-5 space-y-8 flex flex-col">
            <Link
              href={`https://open.spotify.com/show/2PwYGlxlQOCMewp5p6msjH?si=q5bhcA7kQmSSMwIPc1SEXQ&nd=1&dlsi=fb1c7972ad1a42ea`}
            >
              <Image
                src={'/banner/banner2.png'}
                alt="spotify"
                width={400}
                height={400}
              />
            </Link>
            <Link href={`https://www.cii.in/Policy_Watch_News.aspx`}>
              <Image
                src={'/banner/banner3.png'}
                alt="policy"
                width={400}
                height={400}
              />
            </Link>
            <Link
              href={`https://cii.in/NewsletterDetail.aspx?enc=+whTNIbkeQ3JSnjoMDwLQwROK1t698K3cx7+Ihnk/iJUO4DpNeSZyKogEqhQ3Qh3NRInrj4OHFH6BbN2qsHX/0gEyZds4Urepk5K8uZ9FszStzizclkhGCQTsRVbUws7V5k/sZatqUreU8NduL+0XdUXMY/JQWg8vXi4HCcx5iI=`}
            >
              <Image
                src={'/banner/banner4.png'}
                alt="newsletter"
                width={400}
                height={400}
              />
            </Link>
            <Link
              href={`https://www.cii.in/PublicationDetail.aspx?enc=HOk1AvMeKROdtDGTKpFNrilkL+mgMQ1O3FOQMhZ/Rq0htk5Rblezk/ylvw/Fou3UPEzbS+GcMezCFNuXNI7lZm4SgCMqNzdbmmZb+kHFxieTRxEGPnWRf/Sy6fMQeFdirOqjj+CRbJ2CHJyWN7PaE96MO5dessTLMcWX9HGl/VM=`}
            >
              <Image
                src={'/banner/banner5.png'}
                alt="publication"
                width={400}
                height={400}
              />
            </Link>
            <Link
              href={`https://www.cii.in/NewsRoom.aspx?enc=SO0wa+TYDvk3FXKFO1bn1Q==`}
            >
              <Image
                src={'/banner/banner6.png'}
                alt="newsroom"
                width={400}
                height={400}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
