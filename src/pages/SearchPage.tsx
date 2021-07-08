import React, { useState, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';

const tokenStr = '88b41cd7f2b33cf873ba436febf7b0ea';
const SearchPage = ({ location }: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const search_word: string = query.q;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://dapi.kakao.com/v3/search/book?target=title',
          {
            params: { query: `${search_word}` },
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_BOOK_API_KEY}`,
            },
          },
        );
        setData(response.data.documents);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <div> loading </div>;
  }
  if (!data) {
    return null;
  }

  return (
    <h2>
      {data && console.log(data)}
      <div>itme</div>
    </h2>
  );
};

export default SearchPage;
