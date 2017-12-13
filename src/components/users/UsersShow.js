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
      <div>
        <h2>{ this.state.user.displayName }</h2>
        <img src={ this.state.user.displayImage } />
        <h2>Games: { this.state.user.games }</h2>
        <ul>
          <h2>Yays</h2>
          {this.state.user.likes && this.state.user.likes.map((streamer, i) => {
            return(
              <li key={i}><a href={`https://www.twitch.tv/${streamer}`} target="_blank">{streamer}</a></li>
            );
          })}
        </ul>
        <ul>
          <h2>Nays</h2>
          {this.state.user.dislikes && this.state.user.dislikes.map((streamer, i) => {
            return(
              <li key={i}>{streamer}</li>
            );
          })}
        </ul>
        <button onClick={this.resetDislikes}>Reset Nays</button>
        <Link to={`/users/${this.state.user._id}/edit`} className="pure-button">Edit Profile</Link>
      </div>
    );
  }
}

export default UsersShow;
