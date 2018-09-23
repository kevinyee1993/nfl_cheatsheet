const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');
let count = 0;

const PASSING_STATS_URL = 'http://www.espn.com/nfl/statistics/player/_/stat/passing/sort/quarterbackRating';

function searchStats() {
  return fetch(PASSING_STATS_URL)
    .then(response => response.text());
}

function postQbStats(qbName, qbRank) {
  axios.post('http://localhost:8000/stats', {
    qbName: qbName,
    qbRank: qbRank
  })
  .then(response => console.log("posted!"))
  .catch(error => console.log("error!"));
}

searchStats()
  .then(body => {
    const $ = cheerio.load(body);
    $('tr td:nth-child(2)').each(async function(i, element) {
      const $element = $(element);
      let player = $element.text().replace(/,[^,]+$/, "");


      if(player !== 'PLAYER') {
        count++;
        await axios.post('http://localhost:8000/qbStats', {
          qbName: player,
          qbRank: count
        })
        .then(response => console.log("posted"))
        .catch(error => console.log("error!"));
      }

      /*
      axios.post('/user', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      */
    });

    count = 1;
  });
