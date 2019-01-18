/*jslint node: true, es6: true,esversion: 6 */

import mongoose from 'mongoose';
import User from '../models/user.model';
import logger from '../logger'
import ModelConst from '../models/model.const';

/**
* UserController: Handle all user related operation
*/
class UserController {

    // *** Utiylity
    // Handling common error of db ops
    commonError(message, err, code , resp) {
      let sendMessage = err ? `${err}` : message
      logger.error(message + ` E => ${err}` );
      resp.status(code).send({
        success: false,
        message: sendMessage
      });
    }

    user(email) {
      return User.findOne({email: email});
    }

    isValidRole(role) {
      return (role === ModelConst.Role.CONTRIBUTOR || role === ModelConst.Role.ADMIN);
    }

    // Save user
    newUser(user, resp) {
      // Saving
      user.save().then((u) => {
        // Save success
        logger.info(`New User Created:`);
        console.dir(u);
        resp.send({success : true});
      }).catch((err) => {
        // Save failed
        // Logging
        this.commonError('MongoDB save error', err, 500, resp);
      })
    }
    //**** Route Handling

    // User register
    register(req, resp) {
        // Getting req param
        let userName = req.body.name;
        let email = req.body.email;
        let address = req.body.address;
        let password = req.body.password;
        let role = req.body.role;
        let self = this;
        // Validating
        // Case 1: Checcking require field value
        if(!userName || !password || !email || !role) {
            return resp.status(400).send({ message: "Please enter all the required field"});
        }

        // Case 2: Password
        if (password && password.length < 4 ) {
            return resp.status(400).send({ message: "Please enter a password of length 4 or more"});
        }

        // Case3: Role
        if (!self.isValidRole(role)) {
          return resp.status(400).send({ message: "Please enter a valid role"});
        }

        // Create User
        let user = new User({
          userId: Date.now().toString(),
          password: password,
          address: address,
          email: email,
          name: userName,
          role: role,
          createDate: new Date()
        });

        // Check user exists or not
        this.user(email).then((existing) => {
          if (existing) {
            this.commonError(`User exists with email => ${email}`, null, 409, resp )
          } else {
            this.newUser(user, resp);
          }
        }).catch((err) => {
          this.commonError(`Check existing user error`, err, 500, resp);
        });
    }

    // Update
    update(req, resp) {
      // Getting param
      let userId = req.body.userId;
      let self = this;

      // Validating
      if(!userId) {
          return resp.status(400).send({ message: "Please enter userId"});
      }

      // Creating update obj
      let updateObj = {
        password: req.body.password,
        address: req.body.address,
        name: req.body.name,
        role: req.body.role,
        email: req.body.email
      }

      // Updating
      User.findOneAndUpdate({userId: userId}, updateObj).then((u) => {
        logger.info(`User Update success: ${userId} and ${req.body.email}`);
        console.dir(u);
        resp.send({
          success: true,
          message: "Update success"
        });
      }).catch((err) => {
        self.commonError(`Update Fail for ${userId} and ${req.body.email}`, err, 500, resp);
      });

    }

    // Remove user
    remove(req, resp) {
      let self = this;
      let userId = req.body.userId;
      User.findOneAndRemove({userId: userId}).then((r) => {
        resp.send({
          success: true,
          item: r
        })
      }).catch((err) => {
        this.commonError(`User remove error`, err, 500, resp)
      })

    }

    // Login function
    login(req, resp) {
      // Get param
      let email = req.body.email;
      let password = req.body.password;
      let self = this;

      // Validating
      if (!email || !password) {
        return resp.status(400).send({ message: "Please enter all the required field"});
      }

      // Fetch user
      User.find({email: email, password: password}).then((user) => {
        if (user) {
          // Login success
          logger.info(`User Login success: ${email}`);
          resp.send(user);
        } else {
          self.commonError(`User not found: ${email}`, null, 404, resp);
        }
      }).catch((err) => {
        self.commonError(`User ${email} login fail with `, err, 500, resp);
      })
    }

    // Fetch All user
    all(req, resp) {
      let self = this;
      User.find().then((users) => {
        resp.send(users);
      }).catch((err) => {
        self.commonError(`All user fetch error`, err, 500, resp);
      });
    }
}


// Export
const uCon = new UserController();
export default uCon;
