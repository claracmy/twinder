import React from 'react';
import Autosuggest from 'react-bootstrap-autosuggest';

const languages = [
  'en',
  'zh',
  'ja',
  'ko',
  'es',
  'pt',
  'de',
  'pl',
  'ru',
  'fr',
  'it',
  'sv',
  'no',
  'da',
  'nl',
  'fi',
  'tr',
  'cs',
  'hu',
  'sk'
];

class UsersForm extends React.Component {

  render() {
    const { handleSubmit, handleChange, user } = this.props;

    return (
      <div className="users-form container">
        <form onSubmit={ handleSubmit }>
          <h2>{ user.displayName }</h2>

          <label htmlFor="games">GAME</label>
          <input className="form-control" type="text" name="games" id="games" value={ user.games } onChange={ handleChange } /><hr />

          <label htmlFor="language">LANGUAGE</label>
          <Autosuggest
            datalist={languages}
            className="form-control"
            name="language"
            id="language"
            onChange={(language) => handleChange({ target: { name: 'language', value: language }})}
            value={ user.language }
            showToggle={false}
          /><hr />

          <label htmlFor="mature">MATURE</label>
          <input className="form-control" type="Boolean" name="mature" id="mature" value={ user.mature } onChange={ handleChange } />
          <hr />

          <label htmlFor="followerCeiling">FOLLOWER CEILING</label>
          <input className="form-control" type="Number" name="followerCeiling" id="followerCeiling" value={ user.followerCeiling } onChange={ handleChange } /><hr />

          <label htmlFor="followerFloor">FOLLOWER FLOOR</label>
          <input className="form-control" type="Number" name="followerFloor" id="followerFloor" value={ user.followerFloor } onChange={ handleChange } /><hr />

          <button><p>Save</p></button>
        </form>
      </div>
    );
  }
}

export default UsersForm;
