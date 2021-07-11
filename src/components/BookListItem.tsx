import React, { useState } from 'react';
import { IState as IProps } from '../pages/SearchPage';

const BookListItem: React.FC<IProps> = ({ data }: IProps) => {
  const [description, setDescription] = useState<Boolean>(false);

  const authorsReducer = (acc: string, curVal: string): string => {
    return acc + ', ' + curVal;
  };
  const contentsReducer = (acc: string, curVal: string): string => {
    return acc + '. ' + curVal;
  };

  const authors = data.authors.reduce(authorsReducer);
  const date = data.datetime.split('T')[0];

  if (!data.thumbnail) {
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

        {!description ? (
          <img src={`${data.thumbnail}`} alt={data.title} />
        ) : (
          <dd>{data.contents}</dd>
        )}
        <dt>{data.title}</dt>
      </section>

      <section className="card__bottom">
        <span className="card__date">{date}</span>
        <span className="card__authors">\{data.price}</span>
      </section>
    </div>
  );
};

export default BookListItem;
