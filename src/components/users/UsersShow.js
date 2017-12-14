import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class UsersShow extends React.Component {

  state = {
    user: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
  }

  resetLikes = () => {
    Axios
      .patch(`/api/users/${this.state.user._id}`, {
        likes: []
      })
      .then(res => this.setState({ user: res.data.user }))
      .catch(err => console.log(err));
  }

  resetDislikes = () => {
    Axios
      .patch(`/api/users/${this.state.user._id}`, {
        dislikes: []
      })
      .then(res => this.setState({ user: res.data.user }))
      .catch(err => console.log(err));
  }


  render() {
    return(
      <div className="users-show container pure-g">
        <div className="pure-u-4-5 users-show-inner frame-2">
          <h2>{ this.state.user.displayName }</h2>
          <img className="frame-2 pure-u-1-3" src={ this.state.user.displayImage } />
          <div className="pure-u-2-3 users-show-text">
            <p>Language: { this.state.user.language }</p>
            <p>Mature: { String(this.state.user.mature) }</p>
            <p>Game: { this.state.user.games }</p>
            <p>Follower range: { this.state.user.followerFloor} - { this.state.user.followerCeiling }</p>
            <div className="like-logo"></div><a href="#" onClick={this.resetLikes}>Reset</a>
            {this.state.user.likes && this.state.user.likes.map((streamer, i) => {
              return(
                <li key={i}><a href={`https://www.twitch.tv/${streamer}`} target="_blank">{streamer}</a></li>
              );
            })}
            <br />
            <div className="dislike-logo"></div><a href="#" onClick={this.resetDislikes}>Reset</a>
            {this.state.user.dislikes && this.state.user.dislikes.map((streamer, i) => {
              return(
                <li key={i}>{streamer}</li>
              );
            })}
          </div>
          <div className="button-wrapper edit-profile">
            <Link to={`/users/${this.state.user._id}/edit`}><button>Edit Profile</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
