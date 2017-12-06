import React from 'react';
import Axios from 'axios';
// import queryString from 'query-string';

// import Auth from '../../lib/Auth';
import OAuth from '../../lib/OAuth';

class OAuthButton extends React.Component {

  state = {
    code: ''
  }

  componentWillMount() {
    this.AuthLink = OAuth.getAuthLink(OAuth.twitch);

    if (!location.search.match(/\?code=(.+)&/)) return false;

    const code = location.search.match(/\?code=(.+)&/)[1];
    this.setState({ code });

    Axios
      .post('/api/oauth/twitch', {code})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <a href={ this.AuthLink }>Login with Twitch</a>
    );
  }
}

export default OAuthButton;
