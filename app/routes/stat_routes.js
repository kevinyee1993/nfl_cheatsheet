module.exports = function(app, db) {
  const collection =
  app.post('/stats', (req, res) => {

    // need to change this
    // not getting exactly the req i expect
    // problem is the transfer of the object at the axios post
    // call to this point right here, need to figure out where the
    // data went
    const stat = { qbName: req.body.qbName, qbRank: req.body.qbRank };
    // const stat = { qbName: "brumbin", qbRank: "frumbin" };

    // need to change the note in the parameter
    console.log(req.body);

    db.collection('qbStats').insert(stat, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};