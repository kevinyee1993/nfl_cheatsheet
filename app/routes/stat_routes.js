module.exports = function(app, db) {
  // const collection =

  app.get('/stats/:name', (req, res) => {

    // let rank = parseInt(req.params.qbRank);
    const details = { 'name': req.params.name };

    db.collection('stats').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/stats', (req, res) => {

    // need to change this
    // not getting exactly the req i expect
    // problem is the transfer of the object at the axios post
    // call to this point right here, need to figure out where the
    // data went
    const stat = { name: req.body.name,
      rank: req.body.rank,
      position: req.body.position };
    // const stat = { qbName: "brumbin", qbRank: "frumbin" };

    // need to change the note in the parameter
    // console.log(req.body);

    db.collection('stats').insert(stat, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
