import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

// import SearchBar from '../utility/SearchBar';
import StreamsCard from '../streams/StreamsCard';

class StreamsIndex extends React.Component {
  state = {
    streams: [],
    query: ''
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  }


  componentWillMount() {

    Axios
      .get('/api/streams', {
        headers: {
          'twitchToken': localStorage.getItem('twitchToken')
        }
      })
      .then(res => {
        const followerCeiling = Math.ceil(res.data.followers * 1.3);
        const followerFloor = Math.ceil(res.data.followers * 0.7);
        const mature = res.data.mature;

        const array = [];
        res.data.streamResults.forEach(obj => {
          array.push(obj.streams);
        });

        const merged = [].concat.apply([], array);
        const filterByFollowersAndMature = merged.filter(stream => stream.channel.followers <= followerCeiling && stream.channel.followers >= followerFloor && stream.channel.mature === mature);

        this.setState({ streams: filterByFollowersAndMature });
      })
      .catch(err => console.log(err));
  }

  // sort = () => {
  //   const orderedStreams = _.orderBy(this.state.streams, ['channel.followers'], ['asc']);
  //   const regex = new RegExp(this.state.query, 'i');
  //   return _.filter(orderedStreams, (stream) => (regex.test(stream.game)));
  // }

  render() {
    const streams = _.shuffle(this.state.streams);
    return(
      <div className="streams-index">
        <h1>Streams Index</h1>
        {/* { !streams[0] && <p>You do not have any games added yet!</p> } */}
        {/* <SearchBar handleSearch={ this.handleSearch } /> */}
        { streams[0] && <StreamsCard streams={ streams }/>}
      </div>
    );
  }
}

export default StreamsIndex;
