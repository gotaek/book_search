import axios from 'axios'

export const axiosGetData = async (word:string,page=1,size=50)=>{
    let response=await axios.get(
          'https://dapi.kakao.com/v3/search/book?target=title',
          {
            params: {
              query: `${word}`,
              size: `${size}`,
              page: `${page}`,
            },
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_BOOK_API_KEY}`,
            },
          },
    );
    return response;
}