/* parallaxBox component */
import React from 'react';
import { IProps } from '../pages/HomePage';

const ParallaxBox = ({ position }: IProps) => {
  return (
    <>
      <section
        className="parallax__container"
        style={{ backgroundPositionY: position / 2 }}
      >
        <h2>Book Search</h2>
      </section>
    </>
  );
};
export default ParallaxBox;
