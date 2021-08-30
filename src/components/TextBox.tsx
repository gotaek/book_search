/* TextBox */
import React, { useRef, useState, useEffect } from 'react';
import { IProps } from '../pages/HomePage';
const TextBox = ({ position, children }: IProps) => {
  const target = useRef<HTMLDivElement>();
  const [targetPosition, setTargetPosition] = useState<number>(0);

  // target 영역의 1/3이 보여지는 순간부터 fade in 하는 효과
  useEffect(() => {
    setTargetPosition(
      window.pageYOffset +
        target.current.getBoundingClientRect().top +
        (target.current.scrollHeight * 1) / 3 -
        window.innerHeight,
    );
  }, []);

  return (
    <>
      <div
        className="text__container"
        style={{
          opacity: (position - targetPosition) / 400,
        }}
        ref={target}
      >
        {children}
      </div>
    </>
  );
};
export default TextBox;
