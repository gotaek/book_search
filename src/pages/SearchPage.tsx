import React, { useState, useEffect } from 'react';
import qs from 'qs';
import searchFetch from '../API/searchFetch';

const SearchPage = ({ location }: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const search_word: string = query.q;

  useEffect(() => {
    setLoading(true);
    searchFetch(search_word).then((res: any) => {
      setData(res.data.documents);
      console.log(data);
      setLoading(false);
    });
  }, []);
  if (!data) {
    return null;
  }
  return <h2>{data && <div>search success!</div>}</h2>;
};

export default SearchPage;
