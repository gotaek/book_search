import React from 'react';
import qs from 'qs';

const SearchPage = ({ location }: any) => {
  console.log(location.search);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(query.q);

  return <h2>search</h2>;
};

export default SearchPage;
