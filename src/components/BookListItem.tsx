/* BookListItem component */
import React, { useState } from 'react';
import { IState as IProps } from '../pages/SearchPage';

const BookListItem: React.FC<IProps> = ({ data }: IProps) => {
  const [description, setDescription] = useState<Boolean>(false);
  //데이터 파싱 & 저장
  const authors =
    data.authors.length === 1
      ? data.authors
      : `${data.authors[0]} 외 ${data.authors.length} 명`;
  const date = data.datetime.split('T')[0];
  const content =
    data.contents.charAt(data.contents.length - 1) !== '.'
      ? `${data.contents}...`
      : data.contents;

  if (!data.thumbnail || !data.contents) {
    return null;
  }

  const mouseEnterLeaveHandle = () => {
    setDescription(!description);
  };
  return (
    <div className="card">
      <section
        className="card__top"
        onMouseEnter={mouseEnterLeaveHandle}
        onMouseLeave={mouseEnterLeaveHandle}
      >
        <div className="card__header">{authors}</div>
        <div className="card__center">
          {!description ? (
            <img src={`${data.thumbnail}`} alt={data.title} />
          ) : (
            <dd>{content}</dd>
          )}
        </div>

        <dt>{data.title}</dt>
      </section>

      <section className="card__bottom">
        <span className="card__date">{date}</span>
        <span className="card__authors">₩{data.price}</span>
      </section>
    </div>
  );
};

export default BookListItem;
