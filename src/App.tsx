import React from 'react';
import searchFetch from './API/searchFetch';
const App = () => {
  const data = searchFetch("미움");
  data.then(e => {
    console.log(e)
  })
  return (<div>hello world</div> )
    
}

export default App;
