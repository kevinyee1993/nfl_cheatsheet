const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
  // same format as noteRoutes which gets passed the app and db
};
