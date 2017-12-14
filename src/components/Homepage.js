import React from 'react';
import OAuthButton from './auths/OAuthButton';

class Homepage extends React.Component {

  getUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.setState({ user });
    this.props.history.push('/');
  };

  render() {
    return(
      <div className="hero-container">
        <h1 className="floating">TWINDER</h1>
        <h2>Network with Streamers Like You</h2>
        <div className="cta-button"><OAuthButton getUser={ this.getUser }><i className="fa fa-twitch" aria-hidden="true"></i>Login with Twitch</OAuthButton></div>
      </div>
    );
  }
}

export default Homepage;
