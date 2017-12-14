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
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.setState({ user });
    this.props.history.push('/');
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.setState({ user });
  }

  render() {
    return(
      <nav>
        <div className="navbar">
          <ul>
            <Link to="/">Twinder</Link>
            { Auth.isAuthenticated() && <Link to="/streams">My Matches</Link> }
            <div className="pull-right">
              { !Auth.isAuthenticated() && <OAuthButton getUser={ this.getUser }/> }
              { Auth.isAuthenticated() && this.state.user.displayName && <Link to={`/users/${this.state.user._id}`}>{this.state.user.displayName}</Link> }
              { Auth.isAuthenticated() && <a onClick={ this.logout }>Logout</a> }
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
