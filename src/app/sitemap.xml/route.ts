
import { WEBSITE_URL, WEBSITE_URL } from "@/utils/envStore";
import { fetchCategoriesSSR,fetchAllBlogs, fetchAllTags } from "@/app/_queryCall/ssr";
// const dynamic = 'force-dynamic'
export async function GET() {
    
  
    // Fetch dynamic data
    const posts = await fetchAllBlogs();
    const categories = await fetchCategoriesSSR(); 
    const tags = await fetchAllTags(); 
  
    // XML Header
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
    // Add Homepage
    sitemap += `
      <url>
        <loc>${WEBSITE_URL}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `;
  
    // Add Categories
    categories?.forEach((category) => {
      sitemap += `
        <url>
          <loc>${WEBSITE_URL}/category/${category.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });
  
    // Add Tags
    tags?.forEach((tag) => {
      sitemap += `
        <url>
          <loc>${WEBSITE_URL}/tag/${tag.slug}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      `;
    });
  
    // Add Blog Posts
    posts?.forEach((post) => {
      sitemap += `
        <url>
          <loc>${WEBSITE_URL}/${post.slug}</loc>
          <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    });
  
    sitemap += `</urlset>`;
  
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }


// /sitemap.xml