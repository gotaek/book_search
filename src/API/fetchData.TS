import axios from 'axios'
export const fetchData = async (search_word:string) => {
    return await axios.get(
          'https://dapi.kakao.com/v3/search/book?target=title',
          {
            params: {
              query: `${search_word}`,
              size: 50,
              page: 1,
            },
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_BOOK_API_KEY}`,
            },
          },
        );
}