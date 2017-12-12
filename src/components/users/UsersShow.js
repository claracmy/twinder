import React from 'react';
import Axios from 'axios';

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


  render() {
    return(
      <div>
        <h2>{ this.state.user.displayName }</h2>
        <img src={ this.state.user.displayImage } />
        <h2>Games</h2>
        { this.state.user.games && this.state.user.games.map((game, i) =>
          <li key={i}>{game}</li>
        )}
        <ul>
          <h2>Yays</h2>
          {this.state.user.likes && this.state.user.likes.map((streamer, i) => {
            return(
              <li key={i}>{streamer}</li>
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
      </div>
    );
  }
}

export default UsersShow;
