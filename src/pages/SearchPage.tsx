import React, { useState, useEffect } from 'react';
import qs from 'qs';
import BookListItem from '../components/BookListItem';
import { axiosGetData } from '../API/axiosGetData';
import ErrorPage from '../pages/ErrorPage';
import { RouteComponentProps } from 'react-router-dom';
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
  key: string;
}
const SearchPage: React.FC<RouteComponentProps> = ({
  location,
}: RouteComponentProps) => {
  const [data, setData] = useState<IState['data'][]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const search_word: string = query.q;

  useEffect(() => {
    setData([]);
    setPage(2);
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

  const clickHandle = () => {
    setPage(page + 1);
    const response = axiosGetData(search_word, page);
    response.then((res) => {
      if (res.data.meta.is_end === false) {
        const newData = [...data, ...res.data.documents];
        console.log(newData);
        setData(newData);
      }
    });
  };

  if (loading) {
    return <div> loading </div>;
  }
  if (data == null) {
    return null;
  }

  return (
    <>
      {data.length === 0 ? (
        <ErrorPage />
      ) : (
        <div>
          <ul className="grid">
            {data.map((d) => {
              return parseInt(d.isbn) % 2 === 0 ? (
                <BookListItem key={d.isbn} data={d} />
              ) : (
                <BookListItem key={d.isbn} data={d} />
              );
            })}
          </ul>
          <button onClick={clickHandle}>더 보기</button>
        </div>
      )}
    </>
  );
};

export default SearchPage;
