const express = require("express");
const safeBoxRouter = express.Router();
const { isAuth } = require("../../middlewares/auth");
const {
  getOneSafeBox,
  postSafeBox,
  putSafeBox,
} = require("../controllers/safeBoxCtrl");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     basicPassword:
 *       type: http
 *       scheme: basic
 */

/**
 * @swagger
 * /safebox:
 *   post:
 *     summary: Creates a new safebox
 *     description: Creates a new safebox based on a non-empty name and a password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 description: Safebox Name
 *                 type: string
 *               password:
 *                 description: Safebox Password
 *                 type: string
 *             required:
 *                - name
 *                - password
 *             examples:
 *               name: Secure safebox 01
 *               password: extremelySecurePassword
 *     responses:
 *       200:
 *         description: Safebox correctly created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      description: Safebox id
 *                      type: string
 *             required:
 *              - id
 *           examples:
 *              id: f626c808-648c-41fe-865d-c6062f3e0899
 *       409:
 *         description: Safebox already exists
 *       422:
 *         description: Malformed expected data
 *       500:
 *         description: Unexpected API error
 */
safeBoxRouter.post("/safebox", postSafeBox);

/**
 * @swagger
 * /safebox/{id}/items:
 *   get:
 *     summary: Retrieves the content of a safebox
 *     description: Retrieves the currently stored contents in the safebox identified by the given ID
 *     security:
 *       - basicPassword: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Safebox Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Safebox contents correctly retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   description: Safebox items
 *                   type: array
 *                   items:
 *                     type: string
 *               required:
 *                  - items
 *               example:
 *                 items:
 *                   - Safebox content 03
 *                   - Safebox content 02
 *                   - Safebox content 01
 *       401:
 *         description: Specified Basic Auth does not match
 *       404:
 *         description: Requested safebox does not exist
 *       422:
 *         description: Malformed expected data
 *       500:
 *         description: Unexpected API error
 */
safeBoxRouter.get("/{id}/items", [isAuth], getOneSafeBox);

/**
 * @swagger
 * /safebox/{id}/items:
 *   put:
 *     summary: Add an items to a Safebox
 *     description: Inserts new contents in the safebox identified by the given ID and with the given Basic Auth
 *     security:
 *       - basicPassword: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Safebox Id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 description: Safebox items
 *                 type: array
 *               items:
 *                 type: string
 *             required:
 *                - items
 *             examples:
 *               items: 
 *                - Safebox content 03
 *                - Safebox content 02
 *                - Safebox content 01
 *                - New safebox content     
 *     responses:
 *       200:
 *         description: Content correctly added to the safebox
 *       401:
 *         description: Specified Basic Auth does not match
 *       404:
 *         description: Requested safebox does not exist
 *       422:
 *         description: Malformed expected data
 *       500:
 *         description: Unexpected API error
 */
safeBoxRouter.put("/{id}/items", [isAuth], putSafeBox);

module.exports = safeBoxRouter;
