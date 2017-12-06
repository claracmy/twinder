import React from 'react';
import OAuthButton from './auths/OAuthButton';

const Homepage = () => {
  return(
    <div className="hero-container">
      <h1>TWINDER</h1>
      <h2>Network with Streamers Like You</h2>
      <button><OAuthButton><i className="fa fa-twitch" aria-hidden="true"></i>Login with Twitch</OAuthButton></button>
    </div>
  );
};

export default Homepage;
