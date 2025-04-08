import HeroSlider from '@/components/HeroSlider';
import Section2 from './(main)/Section2';
import SectionBreak from '@/components/SectionBreak';
import MostRead from './(main)/MostRead';
import CategorySection from './(main)/CategorySection';
import Layout from '@/components/layout/Layout';
import {
  AllBLogs,
  allTags,
  CategoryWiseBlogsQuery,
  mostViewed,
} from './_queryCall/ssr';

export default async function Home() {
  const allBlogs = await AllBLogs();
  const allTag = await allTags();
  const mostViews = await mostViewed();
  const categoryWiseBlog = await CategoryWiseBlogsQuery();
  return (
    <Layout>
      <main>
        <HeroSlider allBlogs={allBlogs} />
        <Section2 allBlogs={allBlogs} allTag={allTag} />
        <SectionBreak />
        <MostRead mostViews={mostViews} />
        <SectionBreak />
        <CategorySection categoryWiseBlog={categoryWiseBlog} />
      </main>
    </Layout>
  );
}
