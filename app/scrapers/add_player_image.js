const fetch = require('node-fetch');
const cheerio = require('cheerio');

const axios = require('axios');

function searchStats(url) {
  return fetch(url)
    .then(response => response.text());
}

function getImageFromLink(url) {
  return fetch(url)
    .then(response => response.text());
}

async function updateDatabaseWithImage() {
  let results;
  await axios.get('http://localhost:8000/stats')
    .then(response => {results = response.data;}
  )
    .catch(error => console.log(error));

    for(let i = 0; i < results.length; i++) {
      let el = results[i];

      searchStats(el.link)
        .then(async body => {
          const $ = cheerio.load(body);

          let img = $('.main-headshot img')[0].attribs.src;

          axios.put(`http://localhost:8000/stats/${ el.name }`, { image: img } )
              .then(success => console.log(img))
              .catch(error => console.log(error) );
          })
        .catch(error => console.log(error));
    }
}

updateDatabaseWithImage();
