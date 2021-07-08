import React from 'react';
import { IState as IProps } from '../pages/SearchPage';

const ListItem: React.FC<IProps> = ({ data }: IProps) => {
  return <div>{data.title}</div>;
};

export default ListItem;
