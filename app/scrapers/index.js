const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');
let count = 0;

// can add different urls here for different stats
const PASSING_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/passing/sort/quarterbackRating', 'passing yards'];
const TACKLE_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/defense/sort/totalTackles/year/2018/seasontype/2', 'tackles'];
const RUSHING_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/rushing/sort/rushingYards/year/2018/seasontype/2', 'rushing yards'];
const SACKS_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/defense/sort/sacks/year/2018/seasontype/2', 'sacks'];
const RECEIVING_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/receiving/sort/receivingYards/year/2018/seasontype/2', 'receiving yards'];
const INTERCEPTION_STATS_URL = ['http://www.espn.com/nfl/statistics/player/_/stat/defense/sort/interceptions/year/2018/seasontype/2', 'interceptions'];

// pass in different urls here as arg to get the different stats
function searchStats(url) {
  return fetch(url)
    .then(response => response.text());
}

function populateDatabase(url) {
  searchStats(url[0])
    .then(body => {
      const $ = cheerio.load(body);
      $('tr td:nth-child(2)').each(async function(i, element) {
        const $element = $(element);
        const text = $element.text();

        let link = $element.contents()['0'].attribs.href;
        let position = text.substr(text.indexOf(",") + 1);
        let player = text.replace(/,[^,]+$/, "").toLowerCase();

        if(player !== player.toUpperCase()) {
          count++;
          await axios.post('http://localhost:8000/stats', {
            name: player,
            rank: count,
            position: position,
            description: url[1],
            link: link
          })
          .then(response => console.log("posted"))
          .catch(error => console.log("error!"));
        }
      });

      count = 1;
    });
}

populateDatabase(PASSING_STATS_URL);
populateDatabase(TACKLE_STATS_URL);
populateDatabase(RUSHING_STATS_URL);
populateDatabase(SACKS_STATS_URL);
populateDatabase(RECEIVING_STATS_URL);
populateDatabase(INTERCEPTION_STATS_URL);
