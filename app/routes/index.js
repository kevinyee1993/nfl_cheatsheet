const statRoutes = require('./stat_routes');

module.exports = function(app, db) {
  statRoutes(app, db);
  // Other route groups could go here, in the future
  // same format as noteRoutes which gets passed the app and db
};
