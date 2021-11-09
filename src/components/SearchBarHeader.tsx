/* searchBarHeader component */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { RiBookOpenFill } from 'react-icons/ri';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const history = useHistory();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      history.push(`/search?q=${value}`);
    }
  };

  return (
    <header>
      <Link style={{ textDecoration: 'none' }} to={'/'}>
        <div className="title">
          <RiBookOpenFill className={'bookIcon'} />
          <h1>Book Search </h1>
        </div>
      </Link>
      <section>
        <ul className="dropdown__container">
          <li className="dropdown__elem">
            <div className="dropdown__btn">Menu</div>
            <ul className="dropdown-list">
              <li>
                <Link to="#">Projects</Link>
              </li>
              <li>
                <Link to="#">Category</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Link style={{ textDecoration: 'none' }} to={`/search?q=${value}`}>
            <BsSearch className={'searchIcon'} />
          </Link>
        </div>
      </section>
    </header>
  );
};

export default SearchBar;
