/* Home Page */
import React, { useState, useEffect } from 'react';
import ParallaxBox from '../components/ParallaxBox';

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
      <div className="box">
        <img src="https://source.unsplash.com/1600x900/?book" alt="img" />
      </div>
    </>
  );
};
export default HomePage;
