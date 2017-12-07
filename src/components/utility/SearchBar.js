import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return(
    <div>
      <form>
        <p>Search</p>
        <input type="text" onChange={handleSearch} />
      </form>
    </div>
  );
};

export default SearchBar;
