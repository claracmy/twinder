import React from 'react';
import Axios from 'axios';

// import OAuth from '../../lib/OAuth';

class StreamsIndex extends React.Component {
  state = {
    streams: []
  }

  componentWillMount() {

    Axios
      .get('/api/streams', {
        headers: {
          'twitchToken': localStorage.getItem('twitchToken')
        }
      })
      .then(res => {
        this.setState({ streams: res.data.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h1>Streams Index</h1>
        { this.state.streams.map(stream =>
          <li key={stream.id}>
            <img src={stream.thumbnail_url} />
            <h3>{stream.title}</h3>
          </li>
        )}
      </div>
    );
  }
}

export default StreamsIndex;
