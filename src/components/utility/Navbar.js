import React from 'react';
// import { Link } from 'react-router-dom';

import OAuthButton from '../auths/OAuthButton';

const Navbar = () => {
  return(
    <nav>
      <ul>
        <OAuthButton />
      </ul>
    </nav>
  );
};

export default Navbar;
