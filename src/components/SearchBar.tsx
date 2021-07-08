import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SearchBar = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button>
        <Link to={`/search?q=${value}`}>button</Link>
      </button>
    </div>
  );
};

export default SearchBar;
