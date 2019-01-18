/*jslint node: true, es6: true,esversion: 6 */
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import logger from '../logger';
import userController from '../controllers/user.controller';

var postsArray = [];

export default function RouteMain(app) {

  // Static dir path
  var staticDirPath = path.resolve(__dirname, "../..", "./client/www");
  // Body-parsing
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  logger.info('DirName:' + staticDirPath);

  // Static
  app.use('/static', express.static(staticDirPath));

  // Lib
  app.use('/lib', express.static(path.join(staticDirPath + '/lib')));

  // Assets
  app.use('/assets', express.static(path.join(staticDirPath + '/assets')));

  // Middlware
  app.use(function(req, res, next) {
    global.navigator = {
      userAgent: req.headers['user-agent']
    };
    next();
  });

  // Root route
  app.get('/', (req, res) => {
    // Sending root html
    let indexHtmlPath = path.join(staticDirPath + '/index.html');
    res.sendFile(indexHtmlPath);
  });

  app.get('/test', (req, resp) => {
      resp.send({ key: "Hello world"});
  });

  // Login User
  app.post('/api/userlogin', userController.login.bind(userController));

  // Register user
  app.post('/api/register', userController.register.bind(userController));

  // List of user
  app.get('/api/users', userController.all.bind(userController));

  // Update User
  app.post('/api/user/update', userController.update.bind(userController));

  // Remove user
  app.post('/api/user/remove', userController.remove.bind(userController));
}
