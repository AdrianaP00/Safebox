const express = require("express");
const safeBoxRouter = express.Router();
const { isAuth } = require("../../middlewares/auth");
const { getOneSafeBox,postSafeBox,putSafeBox } = require("../controllers/safeBoxCtrl");

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


safeBoxRouter.get("/{id}/items", [isAuth], getOneSafeBox);

safeBoxRouter.put("/{id}/items", [isAuth], putSafeBox);

safeBoxRouter.post("/safebox", postSafeBox);

module.exports = safeBoxRouter;
