import React, { useState, useEffect } from 'react';
import qs from 'qs';
import BookListItem from '../components/BookListItem';
import { axiosGetData } from '../API/axiosGetData';
import NonePage from './NonePage';
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
  ref: any;
}
const SearchPage: React.FC<RouteComponentProps> = ({
  location,
}: RouteComponentProps) => {
  const [data, setData] = useState<IState['data'][]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [target, setTarget] = useState(null);

  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const search_word: string = query.q;

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const fetchMoreData = () => {
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

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await fetchMoreData();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
        root: document.querySelector('body'),
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (loading) {
    return <div> loading </div>;
  }
  if (data == null) {
    return null;
  }

  return (
    <>
      {data.length === 0 ? (
        <NonePage />
      ) : (
        <div>
          <ul className="grid">
            {data.map((d, index) => {
              const lastEl = index === data.length - 1;
              console.log(lastEl);
              return parseInt(d.isbn) % 2 === 0 ? (
                <BookListItem
                  key={d.isbn + index}
                  data={d}
                  ref={lastEl ? setTarget : null}
                />
              ) : (
                <BookListItem
                  key={d.isbn + index}
                  data={d}
                  ref={lastEl ? setTarget : null}
                />
              );
            })}
          </ul>
          <button onClick={fetchMoreData}>더 보기</button>
        </div>
      )}
    </>
  );
};

export default SearchPage;
