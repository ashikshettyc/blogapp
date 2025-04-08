import { BASE_URL } from '@/utils/envStore';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',                   
                    '/category/*',   // Allow all categories
                    '/tag/*',        // Allow all tags (if you have tags)
                    '/*',       // Allow all blog posts
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
