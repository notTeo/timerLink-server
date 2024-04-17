import express from "express";
import * as userValidator from "./user.validator";
import * as userController from "./user.controller";
import {createNewLink} from "../links/linkController";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

// router.use(authMiddleware.token, authMiddleware.validate);

router.get("/", userController.getAllUsers);
router.post(
  "/new-user",
  //   authMiddleware.validate,
  userValidator.createUserValidation,
  userController.createNewUser
);
router.get("/:userId", userController.getUserById);
router.put("/:userId/edit-user", userController.updateUserById);
router.delete("/:userId/delete-user", userController.deleteUserbyId);
router.get("/:userId/links", userController.getLinksByUserId);

export default router;
