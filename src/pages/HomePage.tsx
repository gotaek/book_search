/* Home Page */
import React, { useState, useEffect } from 'react';
import ParallaxBox from '../components/ParallaxBox';
import SwiperBox from '../components/SwiperBox';

const HomePage = () => {
  const [position, setPosition] = useState(0);
  const handleScroll = () => {
    setPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <ParallaxBox position={position} />
      <SwiperBox />
    </>
  );
};
export default HomePage;
