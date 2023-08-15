import { useState, useEffect } from 'react';

const useStickyMode = (offset) => {
  const [scrollFlag, setScrollFlag] = useState(false);

  const throttle = (callback, delay) => {
    let timer = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        callback();
        timer = null;
      }, delay);
    };
  };

  useEffect(() => {
    const updateScroll = () => {
      const { scrollY } = window;
      console.log(scrollY);
      const isScrolled = scrollY >= offset;
      setScrollFlag(isScrolled);
    };

    const handleScroll = throttle(updateScroll, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollFlag;
};

export default useStickyMode;
