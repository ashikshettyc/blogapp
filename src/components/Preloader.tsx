'use client';
import React, { useEffect, useState } from 'react';
import '@/app/css/loader.css';
const Preloader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center gap-5">
          <div className="loading">
            <div className="loading-text">
              <span className="loading-text-words">C</span>
              <span className="loading-text-words">I</span>
              <span className="loading-text-words">I</span>
            </div>
          </div>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Preloader;
