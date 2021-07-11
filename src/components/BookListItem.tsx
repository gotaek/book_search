import React from 'react';
import { IState as IProps } from '../pages/SearchPage';

const BookListItem: React.FC<IProps> = ({ data }: IProps) => {
  if (!data.thumbnail) {
    return null;
  }

  return (
    <div>
      <div>
        {data.title}/{data.authors}
      </div>
      <img src={`${data.thumbnail}`} alt={data.title} width="150px" />
    </div>
  );
};

export default BookListItem;
