const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');
let count = 0;

// can add different urls here for different stats
const PASSING_STATS_URL = 'http://www.espn.com/nfl/statistics/player/_/stat/passing/sort/quarterbackRating';


// pass in different urls here as arg to get the different stats
function searchStats() {
  return fetch(PASSING_STATS_URL)
    .then(response => response.text());
}

function postStats(name, rank) {
  axios.post('http://localhost:8000/stats', {
    name: name,
    rank: rank
  })
  .then(response => console.log("posted!"))
  .catch(error => console.log("error!"));
}

searchStats()
  .then(body => {
    const $ = cheerio.load(body);
    $('tr td:nth-child(2)').each(async function(i, element) {
      const $element = $(element);
      const text = $element.text();

      let position = text.substr(text.indexOf(",") + 1);
      console.log(position);
      let player = text.replace(/,[^,]+$/, "");


      if(player !== 'PLAYER') {
        count++;
        await axios.post('http://localhost:8000/stats', {
          name: player,
          rank: count,
          position: position
        })
        .then(response => console.log("posted"))
        .catch(error => console.log("error!"));
      }
    });

    count = 1;
  });
