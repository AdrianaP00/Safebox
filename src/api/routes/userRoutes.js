const express = require('express');
const usersRouter = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth")
const {getUsers,register,login, userProfile ,getOneUser,postUser,putUser, deleteUser} = require("../controllers/userCtrl")

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Users name
 *         age:
 *           type: number
 *           description: Users age
 *         email:
 *           type: string
 *           description: Users email
 *         password:
 *           type: string
 *           description: Users password
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       example:
 *         name: Jose
 *         email: Jose@diseñador.com
 *         password: Jose123
 *         role: Admin
 *     UsersLogIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Users email
 *         password:
 *           type: string
 *           description: Users password
 *       required:
 *         - email
 *         - password
 *     UsersLogInRes:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/Users'
 *           description: Users object
 *         token:
 *           type: string
 *           description: Valid Bearer token
 *       required:
 *         - user
 *         - token
 *       example:
 *         user: 
 *           name: Jose
 *           email: Jose@diseñador.com
 *           password: Jose123
 *           role: coach
 *         token: Jose123
 */

usersRouter.get('/', [isAuth],getUsers);

usersRouter.get('/:id',[isAuth], getOneUser);

usersRouter.post("/newuser", postUser);

usersRouter.put("/modifyuser/:id",[isAdmin], putUser);

usersRouter.post("/register", register);

usersRouter.delete("/:id",[isAdmin] ,deleteUser);

usersRouter.post("/login", login);
usersRouter.post('/profile', [isAuth], userProfile);

module.exports = usersRouter;