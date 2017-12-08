import React from 'react';

class StreamsCard extends React.Component {

  state = {
    i: 0
  }

  handleClick = () => {
    this.setState(prevState => ({ i: prevState.i + 1 }));
  };


  render() {
    const i = this.state.i;
    return(
      <div className="pure-g">
        <div className="pure-u-4-5 streams">
          <img src={this.props.streams[i].preview.medium} />
          <p>Streamer name: {this.props.streams[i].channel.display_name}</p>
          <p>Game: {this.props.streams[i].game}</p>
          <p>Current viewers: {this.props.streams[i].viewers}</p>
          <p>Stream title: {this.props.streams[i].channel.status}</p>
          <p>Channel followers: { this.props.streams[i].channel.followers}</p>
          <p>Channel views: {this.props.streams[i].channel.views}</p>
          <p>Stream language: {this.props.streams[i].channel.language}</p>
          <p>Mature: {`${this.props.streams[i].channel.mature}`} </p>
          <button onClick={this.handleClick}>Next</button>
        </div>
      </div>
    );
  }
}

export default StreamsCard;
