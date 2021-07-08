import React, { useState, useEffect } from 'react';
import qs from 'qs';
import ListItem from '../components/ListItem';
import { axiosGetData } from '../API/axiosGetData';

interface ILocation {
  location: { pathname: string; search: string; hash: string; state: string };
}
export interface IState {
  data: {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
  };
}
const SearchPage: React.FC<ILocation> = ({ location }: ILocation) => {
  const [data, setData] = useState<IState['data'][] | null>(null);
  const [loading, setLoading] = useState(false);
  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const search_word: string = query.q;

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = axiosGetData(search_word);
        response.then((res) => {
          setData(res.data.documents);
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [search_word]);
  if (loading) {
    return <div> loading </div>;
  }
  if (data == null) {
    return null;
  }

  return (
    <div className="list">
      {data && (
        <textarea
          rows={50}
          cols={200}
          value={JSON.stringify(data, null, 2)}
          readOnly
        ></textarea>
      )}
      {data.length === 0 ? (
        <div>검색결과 없음</div>
      ) : (
        data.map((d) => <ListItem data={d} />)
      )}

      <div>itme</div>
    </div>
  );
};

export default SearchPage;
