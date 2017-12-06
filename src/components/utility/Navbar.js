import React from 'react';
import { Link } from 'react-router-dom';

import OAuthButton from '../auths/OAuthButton';

class Navbar extends React.Component {

  state = {
    user: {}
  }

  getUser = ( user ) => {
    this.setState({ user });
  }

  render() {
    return(
      <nav>
        <ul>
          <Link to="/">Twinder</Link>
          <OAuthButton getUser={ this.getUser }/>
          { this.state.user.displayName && <Link to={`/users/${this.state.user._id}`}>{this.state.user.displayName}</Link> }
        </ul>
      </nav>
    );
  }
}

export default Navbar;
