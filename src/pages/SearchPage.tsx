import React, { useState, useEffect, useRef } from 'react';
import qs from 'qs';
import BookListItem from '../components/BookListItem';
import { axiosGetData } from '../API/axiosGetData';
import ErrorPage from '../pages/ErrorPage';
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
  className: string;
}
const SearchPage: React.FC<ILocation> = ({ location }: ILocation) => {
  const [data, setData] = useState<IState['data'][] | null>(null);
  const [loading, setLoading] = useState(false);

  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const page = useRef(1);

  const search_word: string = query.q;
  const clickHandle = () => {
    const response = axiosGetData(search_word, page.current);
    response.then((res) => {
      page.current += 1;
      setData(res.data.documents);
    });
  };
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
    <div className="grid">
      {data && (
        <textarea
          rows={50}
          cols={200}
          value={JSON.stringify(data, null, 2)}
          readOnly
        ></textarea>
      )}
      {data.length === 0 ? (
        <ErrorPage />
      ) : (
        data.map((d) => <BookListItem className={'bookList'} data={d} />)
      )}
      <button onClick={clickHandle}>더 보기</button>
    </div>
  );
};

export default SearchPage;
