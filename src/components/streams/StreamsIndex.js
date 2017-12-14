import React from 'react';
import Axios from 'axios';
import Spinner from 'react-spinkit';
import _ from 'lodash';

import StreamsCard from '../streams/StreamsCard';

class StreamsIndex extends React.Component {
  state = {
    streams: [],
    query: '',
    user: {},
    isLoaded: false,
    message: ''
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  }


  componentWillMount() {
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    let likes = [];
    let followerCeiling = '';
    let followerFloor = '';

    Axios
      .get(`/api/users/${userId}`)
      .then(res => {
        followerCeiling = res.data.followerCeiling;
        followerFloor = res.data.followerFloor;
        likes = res.data.likes.concat(res.data.dislikes);
        return Axios
          .get('/api/streams', {
            headers: {
              'twitchToken': localStorage.getItem('twitchToken'),
              'userId': userId
            }
          });
      })
      .then(res => {
        followerCeiling = Math.ceil(res.data.followers * followerCeiling);
        followerFloor = Math.ceil(res.data.followers * followerFloor);
        const mature = res.data.mature;
        let filterByLikes = [];

        if (res.data.game === null) this.setState({ message: 'No results returned! Try editing your profile.'});

        //Filter streams by followers, maturity, and likes or dislikes
        const array = [];
        res.data.streamResults.forEach(obj => array.push(obj.streams));
        const merged = [].concat.apply([], array);
        const filterByFollowers = merged.filter(stream => stream.channel.followers <= followerCeiling && stream.channel.followers >= followerFloor);

        //If streamer is mature, return both types of streams. If streamer is PG, return only PG.
        if (mature === false) {
          const filterByMature = filterByFollowers.filter(stream => stream.channel.mature === mature);
          filterByLikes = filterByMature.filter(stream => {
            return likes.indexOf(stream.channel.display_name) === -1;
          });
        } else {
          filterByLikes = filterByFollowers.filter(stream => {
            return likes.indexOf(stream.channel.display_name) === -1;
          });
        }

        this.setState({ streams: filterByLikes, isLoaded: true });

      })
      .catch(err => console.log(err));
  }

  render() {
    const streams = _.shuffle(this.state.streams);
    return(
      <div className="container">
        { this.state.message && <p className="message">{ this.state.message }</p>}
        { !this.state.isLoaded && <div className="spinner-wrapper"><p>INSERTING COINS</p><Spinner name="three-bounce" color="gold" /></div> }
        { streams[0] && <StreamsCard streams={ streams }/>}
      </div>
    );
  }
}

export default StreamsIndex;
