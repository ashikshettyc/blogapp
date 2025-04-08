'use client';
import { useState } from 'react';
import { categories, socialLinks } from '@/app/data';
import Image from 'next/image';
import Link from 'next/link';
import { BiMenu, BiX } from 'react-icons/bi'; // BiMenu (Burger), BiX (Close)
import SearchInput from '../globalsearch/SearchInput';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  console.log(pathName);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Primary Strip */}
      <div className="bg-primary h-8"></div>

      {/* Header Container */}
      <div className="container max-w-5xl xl:max-w-[1280px] mx-auto flex gap-6 items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="w-[180px] md:w-[246px] h-[80px] md:h-[108px]">
          <Image src="/cii-logo.png" width={300} height={108} alt="cii-logo" />
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}

        {/* Desktop Navigation - Right-Aligned */}
        <div className="hidden xl:flex flex-1 self-end lg:-translate-y-1">
          <nav className="flex gap-5">
            {categories.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className={`${
                  pathName === `${item.href}`
                    ? 'border-primary border-b-[3px]'
                    : pathName === `/${item.href}`
                    ? 'border-primary border-b-[3px]'
                    : 'border-transparent'
                } text-primary font-semibold pb-2 border-b-[3px]  hover:border-primary `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search + Social Links (Desktop) */}
        <div className="hidden xl:flex flex-col gap-y-2 self-end z-20 ">
          <div className="lg:-translate-x-[335px] lg:-translate-y-12">
            <SearchInput />
          </div>

          <div className="flex gap-2 py-2 justify-center lg:-translate-y-1 -z-10">
            {socialLinks.map(({ name, Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel=""
                className="text-primary hover:text-primary/80 text-xl transition duration-300 border-2 rounded-full p-1 border-primary"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-primary text-5xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <BiX /> : <BiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`xl:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-primary text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <BiX />
        </button>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-6 text-lg">
          {categories.map((item) => (
            <Link
              href={`/${item.href}`}
              key={item.name}
              className="text-primary font-semibold pb-2 border-b-[3px] border-transparent hover:border-primary"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search & Social Links (Mobile) */}
        <div className="mt-6">
          {/* <div className="relative mb-4">
            <BiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              className="py-2 pl-10 pr-6 w-64 ring-2 ring-gray-500 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Search..."
            />
          </div> */}
          <div className="flex gap-4">
            {socialLinks.map(({ name, Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-2xl transition duration-300 border-2 rounded-full p-2 border-primary"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
