const fetch = require('node-fetch');
const cheerio = require('cheerio');

const PASSING_STATS_URL = 'http://www.espn.com/nfl/statistics/player/_/stat/passing/sort/passingYards/year/2018/seasontype/2';

function searchStats() {
  return fetch(PASSING_STATS_URL)
    .then(response => response.text());
}

searchStats()
  .then(body => {
    const $ = cheerio.load(body);
    $('tr td:nth-child(2)').each(function(i, element) {
      const $element = $(element);
      console.log($element.text());
    });
  });
