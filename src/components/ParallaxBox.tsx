/* parallaxBox component */
import React from 'react';

interface IProps {
  position: number;
}
const ParallaxBox = ({ position }: IProps) => {
  return (
    <>
      <section
        className="parallax__container"
        style={{ backgroundPositionY: position / 2 }}
      >
        <h2>Search Book</h2>
      </section>
    </>
  );
};
export default ParallaxBox;
