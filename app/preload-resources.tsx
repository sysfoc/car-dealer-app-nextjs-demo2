"use client";
import { useEffect } from 'react';

export function PreloadResources() {
  useEffect(() => {
    const preloadImage = document.createElement('link');
    preloadImage.rel = 'preload';
    preloadImage.as = 'image';
    preloadImage.href = '/sysfoc1.webp';
    document.head.appendChild(preloadImage);
    
    return () => {
      document.head.removeChild(preloadImage);
    };
  }, []);

  return null;
}