import React from 'react';

function UsersForm({ handleSubmit, handleChange, user }) {
  return (
    <div className="users-form">
      <form onSubmit={ handleSubmit }>
        <h2>{ user.displayName }</h2>

        <label htmlFor="games">Game</label>
        <input className="form-control" type="text" name="games" id="games" value={ user.games } onChange={ handleChange } /><hr />

        <label htmlFor="language">Language</label>
        <input className="form-control" type="text" name="language" id="language" value={ user.language } onChange={ handleChange } /><hr />

        <label htmlFor="mature">Mature</label>
        <input className="form-control" type="boolean" name="mature" id="mature" value={ user.mature } onChange={ handleChange } /><hr />

        <label htmlFor="followerCeiling">Follower Ceiling</label>
        <input className="form-control" type="Number" name="followerCeiling" id="followerCeiling" value={ user.followerCeiling } onChange={ handleChange } /><hr />

        <label htmlFor="followerFloor">Follower Floor</label>
        <input className="form-control" type="Number" name="followerFloor" id="followerFloor" value={ user.followerFloor } onChange={ handleChange } /><hr />

        <button className="pure-button">Save</button>
      </form>
    </div>
  );
}

export default UsersForm;
