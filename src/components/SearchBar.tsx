import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SearchBar: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const changeEventHandler = (e: any) => {
    setValue(e.target.value);
  };
  const clickEventHandler = () => {};
  return (
    <div>
      <input type="text" value={value} onChange={changeEventHandler} />
      <button onClick={clickEventHandler}>
        <Link to={`/search?q=${value}`}>button</Link>
      </button>
    </div>
  );
};

export default SearchBar;
