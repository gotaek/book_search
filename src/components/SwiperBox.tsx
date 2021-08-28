import React from 'react';

const SwiperBox = () => {
  return (
    <section className="swiper__container">
      <button>이전</button>
      <ul className="imgContainer">
        <li>
          <img src="https://source.unsplash.com/random" alt="img" />
        </li>
        <li>
          <img src="https://source.unsplash.com/random" alt="img" />
        </li>
        <li>
          <img src="https://source.unsplash.com/random" alt="img" />
        </li>
        <li>
          <img src="https://source.unsplash.com/random" alt="img" />
        </li>
      </ul>
      <button>다음</button>
    </section>
  );
};

export default SwiperBox;
