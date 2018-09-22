const fetch = require('node-fetch');

const PASSING_STATS_URL = 'http://www.espn.com/nfl/statistics/player/_/stat/passing/sort/passingYards/year/2018/seasontype/2';

function searchStats() {
  return fetch(PASSING_STATS_URL)
    .then(response => response.text());
}

searchStats()
  .then(body => {
    console.log(body);
  });
