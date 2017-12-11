import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import OAuth from '../../lib/OAuth';

class OAuthButton extends React.Component {

  componentWillMount() {
    this.AuthLink = OAuth.getAuthLink(OAuth.twitch);

    if (!location.search.match(/\?code=(.+)&/)) return false;
    const code = location.search.match(/\?code=(.+)&/)[1];

    Axios
      .post('/api/oauth/twitch', { code })
      .then(res => {
        localStorage.setItem('twitchToken', res.data.twitchToken);
        Auth.setToken(res.data.token);
        this.props.getUser(res.data.user);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <a href={ this.AuthLink }><i className="fa fa-twitch" aria-hidden="true"></i>Login with Twitch</a>
    );
  }
}

export default OAuthButton;
