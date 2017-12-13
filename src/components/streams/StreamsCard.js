import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class StreamsCard extends React.Component {

  state = {
    i: 0,
    user: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
  }

  handleLike = () => {
    const i = this.state.i;
    this.state.user.likes.push(this.props.streams[i].channel.display_name);
    Axios
      .patch(`/api/users/${this.state.user._id}`, {
        likes: this.state.user.likes
      })
      .catch(err => console.log(err));

    // window.open(`https://www.twitch.tv/${this.props.streams[i].channel.display_name}`, '_blank');
    this.setState(prevState => ({ i: prevState.i + 1 }));
  }

  handleDislike = () => {
    const i = this.state.i;
    this.state.user.dislikes.push(this.props.streams[i].channel.display_name);
    Axios
      .patch(`/api/users/${this.state.user._id}`, {
        dislikes: this.state.user.dislikes
      })
      .catch(err => console.log(err));
    this.setState(prevState => ({ i: prevState.i + 1 }));
  }


  render() {
    const i = this.state.i;
    return(
      <div className="pure-g">
        <div className="pure-u-4-5 streams">
          <iframe src={`http://player.twitch.tv/?channel=${this.props.streams[i].channel.display_name}&muted=true`} height="480" width="640" frameBorder="0" scrolling="no" allowFullScreen="true">
          </iframe>
          <p>Streamer name: {this.props.streams[i].channel.display_name}</p>
          <p>Game: {this.props.streams[i].game}</p>
          <p>Current viewers: {this.props.streams[i].viewers}</p>
          <p>Stream title: {this.props.streams[i].channel.status}</p>
          <p>Channel followers: { this.props.streams[i].channel.followers}</p>
          <p>Channel views: {this.props.streams[i].channel.views}</p>
          <p>Stream language: {this.props.streams[i].channel.language}</p>
          <p>Mature: {`${this.props.streams[i].channel.mature}`} </p>
          <button className="pure-button" onClick={ this.handleLike }>Yay</button>
          <button className="pure-button" onClick={ this.handleDislike }>Nay</button>
        </div>
      </div>
    );
  }
}

export default StreamsCard;
