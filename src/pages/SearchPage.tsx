import React, { useState, useEffect } from 'react';
import qs from 'qs';
import BookListItem from '../components/BookListItem';
import { axiosGetData } from '../API/axiosGetData';
import NonePage from './NonePage';
import { RouteComponentProps } from 'react-router-dom';

/*Interface*/
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

/* SearchPage component */
const SearchPage: React.FC<RouteComponentProps> = ({
  location,
}: RouteComponentProps) => {
  const [data, setData] = useState<IState['data'][]>([]); //data를 관리하기 위함
  const [loading, setLoading] = useState(false); //loading 상태를 관리
  const [page, setPage] = useState(2); //page를 관리하여 api 요청을 하기 위함
  const [target, setTarget] = useState(null); //infinite scroll을 위한 ref
  const [pageEnd, setPageEnd] = useState(false); //마지막 페이지인지 아닌지를 확인

  /*쿼리 파싱*/
  const query: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const search_word: string = query.q;

  /* 다른 쿼리 스트링이 들어오면 새롭게 데이터를 fetch */
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
          if (res.data.meta.is_end === true) {
            setPageEnd(true);
          }
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [search_word]);

  /* 스크롤 시 새롭게 데이터를 가져오기 위한 함수 */
  const fetchMoreData = () => {
    setPage(page + 1);
    const response = axiosGetData(search_word, page);
    response.then((res) => {
      if (res.data.meta.is_end === false) {
        const newData = [...data, ...res.data.documents];
        setData(newData);
      } else {
        setPageEnd(true);
      }
    });
  };

  /* infinite scroll */
  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting) {
      setLoading(true);
      observer.unobserve(entry.target);
      if (pageEnd === false) {
        await fetchMoreData();
      } else {
        observer.disconnect();
      }
      setLoading(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  /* loading과 null data 처리 */
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
              return parseInt(d.isbn) % 2 === 0 ? (
                <BookListItem key={d.isbn + index} data={d} />
              ) : (
                <BookListItem key={d.isbn + index} data={d} />
              );
            })}
          </ul>
          <div ref={setTarget} />
        </div>
      )}
    </>
  );
};

export default SearchPage;
