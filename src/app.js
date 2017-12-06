import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

import Navbar from './components/utility/Navbar';
import Routes from './components/utility/Routes';

class App extends React.Component {

  render() {
    return (
      <Router>
        <header>
          <Navbar />
          <Routes />
        </header>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
