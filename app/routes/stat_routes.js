module.exports = function(app, db) {

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

  // FIX THIS LATER
  app.put('/stats/:name', (req,res) => {
    // const id = req.params.id;
    const details = { 'name': req.params.name };

    const image = { image: req.body.image };

    // db.foo.update({},{$set : { "about.bio" : ""}} , true, true);

    // db.collection('stats').update(details, image, (err, result) => {
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
};
