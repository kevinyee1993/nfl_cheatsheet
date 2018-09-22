module.exports = function(app, db) {
  const collection =
  app.post('/stats', (req, res) => {

    // need to change this
    const note = { text: req.body.body, title: req.body.title };

    // need to change the note in the parameter
    db.collection('stats').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
