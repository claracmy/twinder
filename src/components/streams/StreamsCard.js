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
      .get(`/api/users/${Auth.getPayload().userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
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
      }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .catch(err => console.log(err));

    window.open(`https://www.twitch.tv/${this.props.streams[i].channel.display_name}`, '_blank');
    this.setState(prevState => ({ i: prevState.i + 1 }));
  }

  handleDislike = () => {
    const i = this.state.i;
    this.state.user.dislikes.push(this.props.streams[i].channel.display_name);
    Axios
      .patch(`/api/users/${this.state.user._id}`, {
        dislikes: this.state.user.dislikes
      }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .catch(err => console.log(err));
    this.setState(prevState => ({ i: prevState.i + 1 }));
  }


  render() {
    const i = this.state.i;
    return(
      <div className="pure-g">
        <div className="pure-u-4-5 streams-card">
          <div className="pure-u-4-5 streams">
            <p className="stream-title"><i className="fa fa-circle rec"></i> NOW PLAYING: {this.props.streams[i].channel.status}</p>
            <iframe className="frame-2" src={`http://player.twitch.tv/?channel=${this.props.streams[i].channel.display_name}&muted=true`} height="450" width="800" frameBorder="0" scrolling="no" allowFullScreen="true">
            </iframe>
            <div className="stream-info">
              <div className="stream-name">
                <p>{this.props.streams[i].channel.display_name}</p>
              </div>
              <div className="stream-info-inner">
                <img className="frame-2" src={ this.props.streams[i].channel.logo} />
                <div className="stream-text">
                  <p>{this.props.streams[i].game}</p>
                  <p><i className="fa fa-user"></i>{this.props.streams[i].viewers}</p>
                  <p><i className="fa fa-heart"></i>{ this.props.streams[i].channel.followers}</p>
                  <p><i className="fa fa-eye"></i>{this.props.streams[i].channel.views}</p>
                  <p><i className="fa fa-globe"></i>{this.props.streams[i].channel.language}</p>
                  <p>Mature: {`${this.props.streams[i].channel.mature}`} </p>
                </div>
                <div className="button-wrapper">
                  <div className="custom-button like-button" onClick={ this.handleLike }></div>
                  <div className="custom-button dislike-button" onClick={ this.handleDislike }>   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StreamsCard;
