import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

import SearchBar from '../utility/SearchBar';

// import OAuth from '../../lib/OAuth';

class StreamsIndex extends React.Component {
  state = {
    streams: [],
    query: ''
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  }

  sort = () => {
    const regex = new RegExp(this.state.query, 'i');
    return _.filter(this.state.streams, (stream) => (regex.test(stream.game)));
  }

  componentWillMount() {

    Axios
      .get('/api/streams', {
        headers: {
          'twitchToken': localStorage.getItem('twitchToken')
        }
      })
      .then(res => {
        this.setState({ streams: res.data.streams });
      })
      .catch(err => console.log(err));
  }

  render() {
    const streams = this.sort();

    return(
      <div className="streams-index">
        <h1>Streams Index</h1>
        <SearchBar handleSearch={ this.handleSearch } />
        <div className="pure-g">
          { streams.map(stream =>
            <div key={stream._id} className="pure-u-1-3 streams">
              <img src={stream.preview.medium} />
              <p>Streamer name: {stream.channel.display_name}</p>
              <p>Game: {stream.game}</p>
              <p>Current viewers: {stream.viewers}</p>
              <p>Stream title: {stream.channel.status}</p>
              <p>Channel followers: { stream.channel.followers}</p>
              <p>Channel views: {stream.channel.views}</p>
              <p>Stream language: {stream.channel.language}</p>
              <p>Mature? {`${stream.channel.mature}`} </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StreamsIndex;
