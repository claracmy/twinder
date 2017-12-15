import React from 'react';
import Autosuggest from 'react-bootstrap-autosuggest';
import Axios from 'axios';

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

let games = [];

class UsersForm extends React.Component {

  componentWillMount() {
    Axios
      .get('/api/games')
      .then(res => {
        games = res.data.map(game => game.name);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { handleSubmit, handleChange, user, errors } = this.props;
    const formInvalid = Object.keys(errors).some(key => errors[key]);

    return (
      <div className="users-form container">
        <form onSubmit={ handleSubmit }>
          <h2>{ user.displayName }</h2>

          <label htmlFor="games">GAME</label>
          <Autosuggest
            datalist={games}
            className="form-control"
            name="games"
            id="games"
            onChange={(games) => handleChange({ target: { name: 'games', value: games }})}
            value={ user.games }
            showToggle={false}
          />
          { errors.games && <small>{ errors.games }</small> }
          <hr />

          <label htmlFor="language">LANGUAGE</label>
          <Autosuggest
            datalist={languages}
            className="form-control"
            name="language"
            id="language"
            onChange={(language) => handleChange({ target: { name: 'language', value: language }})}
            value={ user.language }
            showToggle={false}
          />
          { errors.language && <small>{ errors.language }</small> }
          <hr />

          <label htmlFor="mature">MATURE</label>
          <input className="form-control" type="Boolean" name="mature" id="mature" value={ user.mature } onChange={ handleChange } />
          { errors.mature && <small>{ errors.mature }</small> }
          <hr />

          <label htmlFor="followerCeiling">FOLLOWER CEILING</label>
          <input className="form-control" type="Number" name="followerCeiling" id="followerCeiling" value={ user.followerCeiling } onChange={ handleChange } />
          { errors.followerCeiling && <small>{ errors.followerCeiling }</small> }
          <hr />

          <label htmlFor="followerFloor">FOLLOWER FLOOR</label>
          <input className="form-control" type="Number" name="followerFloor" id="followerFloor" value={ user.followerFloor } onChange={ handleChange } />
          { errors.followerFloor && <small>{ errors.followerFloor }</small> }
          <hr />

          <button disabled={ formInvalid }><p>Save</p></button>
        </form>
      </div>
    );
  }
}

export default UsersForm;
