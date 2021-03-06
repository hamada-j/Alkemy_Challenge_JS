'use strict';
// const router = require("express").Router();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


const { check, validationResult } = require("express-validator");

const rMiddleware = require("../middleware/registerAction");

const tMiddleware = require("../middleware/checkToken");

const mController = require("../controllers/movement");
const sController = require("../controllers/user");

const User = require("../models/user");

const createToken = require("../utils/createToken");

const generatePassword = require("../utils/generateID");


router.use(rMiddleware.registerAction);


/**
* @swagger
* tags:
*   name: API
*   description: La API del challenge
*/

/**
* @swagger
* definitions:
*   movementSchema:
*     type: object
*     required:
*       - Concepto
*       - Cantidad
*       - Tipo
*       - Fecha
*       - Id Usuario
*     properties:
*       concepto:
*         type: string
*       cantidad:
*         type: number
*       tipo:
*         type: string
*       fecha:
*         type: date
*       usuario:
*         type: number
*/

/**
* @swagger
* definitions:
*   userSchema:
*     type: object
*     required:
*       - usuario
*       - email
*       - password
*     properties:
*       usuario:
*         type: string
*       email:
*         type: string
*       password:
*         type: string
*/



/**
* @swagger
* /all_movement/{userId}:
*   get:
*     summary: "Get all movement of a User"
*     tags: [Get Movements]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         description: User Id of the document to retrieve.
*         schema:
*            $ref: "#/definitions/movementSchema"
*     responses:
*       200:
*         description: Get All movement of a User
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/

router.get("/all_movement/:userId", tMiddleware.checkToken, async (req, res, next) => {

  try {
    const rows = await mController.getAllMovement(req.params.userId);
    res.status(200).json(rows)
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
* @swagger
* /one_movement/{movementId}:
*   get:
*     summary: "Get one movement of a User"
*     tags: [Get Movements]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: movementId
*         required: true
*         description: MovementId Id of the document to retrieve.
*         schema:
*            $ref: "#/definitions/movementSchema"
*     responses:
*       200:
*         description: Get one movement of a User
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/

router.get("/one_movement/:movementId", tMiddleware.checkToken,  async (req, res, next) => {

  try {
    const rows = await mController.getMovement(req.params.movementId);
    res.status(200).json(rows)
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


/**
* @swagger
* /post_movement:
*   post:
*     summary: "Create a movement introduce by user"
*     tags: [Post Movement]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object to create a doc.
*         schema:
*            $ref: "#/definitions/movementSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/movementSchema"         
*     responses:
*       200:
*         description: Post one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*
*/

router.post("/post_movement", tMiddleware.checkToken, async (req, res, next) => {
  console.log(req.body)
  try {
    const result = await mController.createMovement(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


/**
* @swagger
* /update_movement/{movementId}:
*   patch:
*     summary: "Update one movement of a User"
*     tags: [Update Movement]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: movementId
*         required: true
*         description: MovementId Id of the document to retrieve.
*         schema:
*            $ref: "#/definitions/movementSchema"
*       - in: body
*         name: body
*         required: true
*         description: object to update a doc.
*         schema:
*            $ref: "#/definitions/movementSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/movementSchema"         
*     responses:
*       200:
*         description: Post one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*
*/

router.patch("/update_movement/:movementId", tMiddleware.checkToken, async (req, res, next) => {
  try {
    const result = await mController.updateMovement({
      concepto: req.body.concepto,
      cantidad: req.body.cantidad,
      tipo: req.body.tipo,
      fecha: req.body.fecha,
      usuario: req.body.usuario,
      id: req.params.movementId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});



/**
* @swagger
* /delete_one_movement/{movementId}:
*   delete:
*     summary: "Givin a id for delete a document"
*     tags: [Delete]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: _id of the document to delete.
*         schema:
*           $ref: "#/definitions/movementSchema"
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/

router.delete("/delete_one_movement/:movementId", tMiddleware.checkToken, async (req, res, next) => {

  try {
    const rows = await mController.deleteMovement(req.params.movementId);
    res.status(200).json(rows)
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



/**
* @swagger
* /register:
*   post:
*     summary: "Register a new user in the Api"
*     tags: [Register a User]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*/

router.post(
  "/register",
  [
    check("username", "el nombre de usario de 3 a 10 valores")
      .isLength({ min: 3, max: 10 })
      .isAlphanumeric(),
    check("email", "el email debe ser correcto")
      .normalizeEmail()
      .isEmail(),
    check("password", "de 4 a 8 digitos")
      .exists()
      .custom(value => {
        return /^(?=.*\d).{4,8}$/.test(value);
      })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    const userEmail = await User.emailExists(req.body.email);
    const userName = await User.nameExists(req.body.username);

    if (!errors.isEmpty() || userEmail || userName) {
      console.log("here is the error")
      return res.status(422).json(errors.array());
    }
   
    const passwordEnc = bcrypt.hashSync(req.body.password, 8);
    req.body.password = passwordEnc;

    try {
      let newUser = {
        usuario: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      const result = await User.create(newUser);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
);


/**
* @swagger
* /login_with_email:
*   post:
*     summary: "Login a user in the Api with Email"
*     tags: [Login a User with Email]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*/

router.post("/login_with_email", async (req, res) => { 
  try {
    const user = await User.emailExists(req.body.email);
    if (!user) {
      res.status(401).json({ error: "error en email y/o password" });
    }
    
    const equal = bcrypt.compareSync(req.body.password, user.password);
    
    if (equal) {

      res.status(201).json({ id: user.id, success: createToken(user)});
    } else {
      res.status(401).json({ error: "error en email y/o password" });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
* @swagger
* /login_with_username:
*   post:
*     summary: "Login a user in the Api with Username"
*     tags: [Login a User with Username]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*/


router.post("/login_with_username", async (req, res) => { 
  try {
    const user = await User.nameExists(req.body.username);
    if (!user) {
      res.status(401).json({ error: "error en email y/o password" });
    }
    
    const equal = bcrypt.compareSync(req.body.password, user.password);
    
    if (equal) {

      res.status(201).json({ id: user.id, success: createToken(user)});
    } else {
      res.status(401).json({ error: "error en email y/o password" });
    }
  } catch (err) {
    console.log(err);
  }
});



/**
* @swagger
* /forgot:
*   post:
*     summary: "User forgot the password and the Api send temporal one"
*     tags: [Forgot the password]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*/


router.post("/forgot", async (req, res) => { 

  try {
    const user = await User.emailExists(req.body.email);

    if (!user) {
      res.status(401).json({ error: "this email is not in the DataBase" });
    }

    let newPassword = generatePassword()
    const passwordEnc = bcrypt.hashSync(newPassword, 8);
 
    let docData = {
      usuario: user.usuario,
      email: user.email,
      password: passwordEnc,
      id: user.id
    }

    await sController.updatePassword(docData)

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "un_email_de_Gmail_que_permita_acceso_app_de_terceros_O_un_server_email_propio@gmail.com",
          pass: "la_contrase??a_de_la_cuenta_email",
        },
      });

      let mailOptions = {
        from: "testingnodejs@gmail.com",
        to: user.email,
        subject: "APP ECO [ Password Reset ]",
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nThis is your temporal password: ${newPassword}\n\nBest regards.\n`,
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("error not sent___", err);
          res.status(401).json({ message: "No se ha podido enviar el email " + err });
        } else {
          console.log("email is sent");
          res.status(201).json({ message: "Email is sent"});
        }
      });
 
  } catch (err) {
    console.log(err);
  }
});




// const passport = require('passport')
// let GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// passport.use(new GoogleStrategy({
//     consumerKey: GOOGLE_CONSUMER_KEY,
//     consumerSecret: GOOGLE_CONSUMER_SECRET,
//     callbackURL: "/"
//   },
//   (token, tokenSecret, profile, done) => {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));


// router.get('/login_with_google', async (req, res) => { 

// })


module.exports = router;
