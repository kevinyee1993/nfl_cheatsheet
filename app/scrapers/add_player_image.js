const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');

// function searchStats(url) {
//   return fetch(url)
//     .then(response => response.text());
// }

function getImageFromLink(url) {
  return fetch(url)
    .then(response => response.text());
}

function updateDatabaseWithImage() {
  
}
