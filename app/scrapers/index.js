const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');
let count = 1;

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
        await axios.post('http://localhost:8000/stats', {
          qbName: player,
          qbRank: count
        })
        .then(response => console.log("posted"))
        .catch(error => console.log("error!"));

        // await axios({
      //     method: 'post',
      //     url: 'http://localhost:8000/stats',
      //     data: {
      //       qbName: player,
      //       qbRank: count
      //   }
      // });

        count++;
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
