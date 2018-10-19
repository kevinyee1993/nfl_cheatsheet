const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = process.env.mongoURL || require('../react-ui/config/db');

const PORT = process.env.PORT || 5000;

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


MongoClient.connect(db, { useNewUrlParser: true }, (err, client) => {

  if (err) return console.log(err);

  app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
  });

  app.get('/stats/:name', (req, res) => {
    let name = req.params.name.replace(/%20/g," ");
    // const details = { 'name': req.params.name.replace(/ /g,"%20") };
    // const details = { 'name': req.params.name };
    // console.log(name);
    const details = { 'name': name };

    db.collection('stats').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/stats', async (req,res) => {
    const statsArr = [];
    let arr = await db.collection('stats').find().toArray();
    res.send(arr);
  });


  app.put('/stats/:name', (req,res) => {
    const details = { 'name': req.params.name };

    const image = { image: req.body.image, team: req.body.team };
    db.collection('stats').update(details, {$set : image}, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(image);
      }
    });
  });

  app.post('/stats', (req, res) => {

    const stat = { name: req.body.name,
      rank: req.body.rank,
      position: req.body.position,
      description: req.body.description,
      link: req.body.link };


    db.collection('stats').insert(stat, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  // app.listen(PORT, function () {
  //   console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  // });

});
