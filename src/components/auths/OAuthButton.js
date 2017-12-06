import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import OAuth from '../../lib/OAuth';

class OAuthButton extends React.Component {

  state = {
    code: '',
    user: {}
  }

  componentWillMount() {
    this.AuthLink = OAuth.getAuthLink(OAuth.twitch);

    if (!location.search.match(/\?code=(.+)&/)) return false;

    const code = location.search.match(/\?code=(.+)&/)[1];
    this.setState({ code });

    Axios
      .post('/api/oauth/twitch', {code})
      .then(res => {
        this.setState({ user: res.data.user});
        this.props.getUser(res.data.user);
        Auth.setToken(res.data.token);
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
