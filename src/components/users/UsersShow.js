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
      </div>
    );
  }
}

export default UsersShow;
