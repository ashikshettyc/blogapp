import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { WEBSITE_URL } from '@/utils/envStore';
import Script from 'next/script';
const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Confederation of Indian Industry (CII)',
    default: 'Confederation of Indian Industry',
  },
  description:
    'Stay updated with the latest trends in industry, business, startups, unicorns, corporate governance, technology, AI, IoT, robotics, machine learning, and digitalization. Explore comprehensive GDP data, productivity, quality, MSME marketing, and empowering women entrepreneurs with digital tools.',

  keywords: [
    'Industry News',
    'Business Trends',
    'Startups',
    'Unicorns',
    'Corporate Governance',
    'Technology',
    'AI',
    'Artificial Intelligence',
    'IoT',
    'Robotics',
    'Machine Learning',
    'Digitalization',
    'MSME Marketing',
    'GDP Data',
    'Women Entrepreneurs',
    'Productivity',
    'Innovation',
    'Marketing',
    'Quality',
  ],

  twitter: {
    card: 'summary_large_image',
    site: '@CII_Blog',
    title: 'CII Blog | Confederation of Indian Industry (CII)',
    description:
      'Get the latest updates on industry trends, business, technology, AI, machine learning, and more. Empowering businesses and entrepreneurs with digital tools and innovative strategies.',
    images: `${WEBSITE_URL}/og-image.webp`,
  },
  openGraph: {
    title: 'CII Blog | Confederation of Indian Industry (CII)',
    type: 'website',
    locale: 'en_US',
    siteName: 'CII Blog',
    description:
      'Stay updated with trending topics in business, industry, technology, AI, and more. Explore resources for entrepreneurs, including women empowerment, digital tools, and business success strategies.',
    images: [
      {
        url: `${WEBSITE_URL}/og-image.webp`,
        width: 1200,
        height: 600,
        alt: 'CII Blog | Confederation of Indian Industry (CII)',
      },
    ],
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${WEBSITE_URL}`,
  },
  other: {},
};
const companySchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Confederation of Indian Industry',
  url: WEBSITE_URL,
  logo: `${WEBSITE_URL}/cii-logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '18001031244',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.linkedin.com/company/confederation-of-indian-industry/',
    'https://x.com/FollowCII/',
    'https://www.facebook.com/FollowCII/',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Confederation of Indian Industry',
  url: WEBSITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${WEBSITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}  antialiased`}>
        {/* Inject Company JSON-LD */}
        <Script
          id="json-ld-company"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
        />

        {/* Inject Website JSON-LD */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
