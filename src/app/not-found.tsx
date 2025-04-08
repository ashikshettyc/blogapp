import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h1 className="text-4xl font-bold text-red-600">Page Not Found</h1>
        <p className="text-gray-500 mt-2">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Go to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
