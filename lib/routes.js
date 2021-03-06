'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/posts', api.posts);
  app.post('/api/posts', api.postit);    
  app.delete('/api/posts/:id', api.remove);
  app.put('/api/posts/:id', api.editsave);
  app.get('/api/posts/:id', api.showinfo);
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/memail', users.memail);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.delete('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};