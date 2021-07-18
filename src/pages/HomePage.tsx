import React from 'react';
import { Spring, animated } from 'react-spring';
const HomePage = () => {
  return (
    <Spring
      loop
      from={{ opacity: 0, color: 'red' }}
      to={[
        { opacity: 1, color: '#ffaaee' },
        { opacity: 0, color: 'rgb(14,26,19)' },
      ]}
    >
      {(styles) => (
        <animated.div style={styles}>I will fade in and out</animated.div>
      )}
    </Spring>
  );
};
export default HomePage;
