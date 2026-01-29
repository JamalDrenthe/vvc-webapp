import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const scrollOptions: ScrollToOptions = { top: 0, left: 0, behavior: 'auto' };
    // Window & document
    window.scrollTo(scrollOptions);
    document.documentElement?.scrollTo?.(scrollOptions);
    document.body?.scrollTo?.(scrollOptions);

    // Common app containers (root-level scrollable divs)
    const root = document.getElementById('root');
    root?.scrollTo?.(scrollOptions);
    const app = document.getElementById('app');
    app?.scrollTo?.(scrollOptions);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
