import axios from 'axios';

const tokenStr = '88b41cd7f2b33cf873ba436febf7b0ea';
const searchFetch = async (word: string) => {
  try {
    const result = await axios.get(
      'https://dapi.kakao.com/v3/search/book?target=title',
      {
        params: { query: `${word}` },
        headers: {
          Authorization: `KakaoAK ${tokenStr}`,
        },
      },
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export default searchFetch;
