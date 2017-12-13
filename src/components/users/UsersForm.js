import React from 'react';

function UsersForm({ handleSubmit, handleChange, user }) {
  return (
    <div>
      <form className="pure-form pure-form-aligned" onSubmit={ handleSubmit }>
        <p>{ user.displayName }</p>
        
        <label htmlFor="games">Game</label>
        <input type="text" name="games" id="games" value={ user.games } onChange={ handleChange } />

        <label htmlFor="language">Language</label>
        <input type="text" name="language" id="language" value={ user.language } onChange={ handleChange } />

        <label htmlFor="mature">Mature</label>
        <input type="boolean" name="mature" id="mature" value={ user.mature } onChange={ handleChange } />

        <label htmlFor="followerCeiling">Follower Ceiling</label>
        <input type="Number" name="followerCeiling" id="followerCeiling" value={ user.followerCeiling } onChange={ handleChange } />

        <label htmlFor="followerFloor">Follower Floor</label>
        <input type="Number" name="followerFloor" id="followerFloor" value={ user.followerFloor } onChange={ handleChange } />

        <button className="pure-button">Save</button>
      </form>
    </div>
  );
}

export default UsersForm;
