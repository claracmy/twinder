import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
import OAuthButton from '../auths/OAuthButton';

class Navbar extends React.Component {
  state = {
    user: {}
  }

  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  };

  getUser = (user) => {
    this.setState({ user });
    this.props.history.push('/');
  }

  render() {
    return(
      <nav>
        <ul>
          <Link to="/">Twinder</Link>
          <Link to="/streams">Browse Streams</Link>
          { !Auth.isAuthenticated() && <OAuthButton getUser={ this.getUser }/> }
          { Auth.isAuthenticated() && this.state.user.displayName && <Link to={`/users/${this.state.user._id}`}>{this.state.user.displayName}</Link> }
          { Auth.isAuthenticated() && <a onClick={ this.logout }>Logout</a> }
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
