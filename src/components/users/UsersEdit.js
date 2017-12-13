import React from 'react';
import Axios from 'axios';

import UsersForm from './UsersForm';
import Auth from '../../lib/Auth';

class UsersEdit extends React.Component{
  state = {
    user: {
      games: '',
      mature: '',
      language: '',
      followerCeiling: '',
      followerFloor: ''
    }
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = ({target: {name, value}}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
    console.log(this.state.user);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .patch(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.props.history.push(`/users/${res.data.user._id}`))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <UsersForm
        handleChange={ this.handleChange }
        handleSubmit={ this.handleSubmit }
        user={ this.state.user }
      />
    );
  }
}

export default UsersEdit;
