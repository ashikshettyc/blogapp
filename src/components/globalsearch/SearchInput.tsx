/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { AsyncTypeahead, Menu } from 'react-bootstrap-typeahead';
import Image from 'next/image';
import { searchBlogsQuery } from '@/app/_queryCall/csr';
import { BASE_URL } from '@/utils/envStore';
import Link from 'next/link';

const SearchInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const blogsSearch = await searchBlogsQuery(query);
    setOptions(blogsSearch?.blogs || []);
    setIsLoading(false);
  };

  const filterBy = () => true;

  return (
    <form>
      <div className="absolute left-[65%] top-[30%] w-[400px]">
        <AsyncTypeahead
          filterBy={filterBy}
          id="async-example"
          isLoading={isLoading}
          labelKey="title"
          minLength={2}
          maxResults={8}
          size="lg"
          onSearch={handleSearch}
          inputProps={{
            className:
              'rounded-lg outline-none ring-2 ring-primary w-full py-2 px-4',
          }}
          options={options}
          placeholder="Search blogs..."
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderMenuItemChildren={(option: any) => (
            <Link href={`/${option?.slug}`} className="">
              <div className="bg-white w-full flex gap-3 p-2  transition-all duration-300">
                <Image
                  alt={option.title}
                  src={`${BASE_URL}${option.banner.url}`}
                  width={150}
                  height={200}
                  className="object-cover rounded-md"
                />
                <span className="font-bold text-xl text-primary">
                  {option.title.slice(0, 50)}
                </span>
              </div>
            </Link>
          )}
          renderMenu={(results) => (
            <Menu className="shadow-lg border rounded-md">
              {isLoading ? (
                <div className="p-4 text-center bg-white text-gray-500">
                  Loading...
                </div>
              ) : results.length === 0 ? (
                <div className="p-4 text-center bg-white text-gray-500">
                  No results found
                </div>
              ) : (
                results.map((option: any, index) => (
                  <div key={index}>
                    <Link href={`/${option?.slug}`} className="">
                      <div className="flex gap-3 p-2 bg-white transition-all duration-300">
                        <Image
                          alt={option.title}
                          src={`${BASE_URL}${option.banner.url}`}
                          width={150}
                          height={200}
                          className="object-cover rounded-md"
                        />
                        <span className="font-bold text-xl text-primary">
                          {option.title.slice(0, 50)}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </Menu>
          )}
        />
      </div>
    </form>
  );
};

export default SearchInput;
