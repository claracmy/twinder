import queryString from 'query-string';

class OAuth {
  static twitch = {
    name: 'twitch',
    url: '/api/oauth/twitch',
    authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
    redirectUri: 'https://twinderapp.herokuapp.com/',
    scope: ['channel_read'],
    scopeDelimiter: ' ',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 500, height: 560 }
  }

  static getAuthLink(twitch) {
    const qs = {
      scope: twitch.scope,
      redirect_uri: twitch.redirectUri,
      client_id: 'eb1tb9iqo5qndbi547weynru6of7rf',
      response_type: 'code'
    };

    return `${twitch.authorizationEndpoint}?${queryString.stringify(qs)}`;
  }
}

export default OAuth;
