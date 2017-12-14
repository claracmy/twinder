const rp = require('request-promise');
const { dbURI } = require('../config/environment');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const Game = require('../models/game');


mongoose.connect(dbURI, { useMongoClient: true });

Game.collection.drop();

rp({
  method: 'GET',
  url: 'https://api.twitch.tv/kraken/games/top?limit=100',
  json: true,
  headers: {
    'Client-ID': 'eb1tb9iqo5qndbi547weynru6of7rf'
  }
})
  .then(res => {
    const allPages = [];
    const pages = Math.ceil(res._total/100);

    for ( let i = 0; i < pages; i ++ ) {
      const offset = i * 100;
      const eachPage = {
        method: 'GET',
        url: `https://api.twitch.tv/kraken/games/top?limit=100&offset=${offset}`,
        json: true,
        headers: {
          'Client-ID': 'eb1tb9iqo5qndbi547weynru6of7rf'
        }
      };
      allPages.push(rp(eachPage));
    }
    return Promise.all(allPages);
  })
  .then(games => {
    const gamesArray = [];
    games.forEach(obj => gamesArray.push(obj.top));
    const merged = [].concat.apply([], gamesArray);
    const promises = merged.map(game => {
      return Game
        .create({ name: game.game.name });
    });

    return Promise.all(promises);
  })
  .then(games => console.log(`${games.length} games created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
