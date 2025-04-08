import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "CII Blog | Confederation of Indian Industy(CII)",
        short_name: "CII Blog | Confederation of Indian Industy(CII)",
        description:
            "Trending Topics Industry Business Startup Unicorn Corporate Governance Technology Automation Design Innovation AI Artificial Intelligence IOT Robotics Machine Learning Digitalisation MSME Marketing Most Read GDP data has to be Comprehensive and include Productivity &#038; Quality 04 Mar 2024 Read More Empowering Women Entrepreneurs: Driving Business Success with Digital Tools 09&hellip;",
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#e03944',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
        screenshots: [
            {
                src: "screenshots/homePage.png",
                sizes: "1280x720",
                type: "image/png",
            },
        ],
        categories: [
            "Economy",
            "Industry",
            "International",
            "Community",
            "Sustainability",
            "Technology",
            "DG’s Journal",
           
        ],
        lang: "en",
    }
}

