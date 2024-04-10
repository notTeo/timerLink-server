import express from "express";
import * as userValidator from "./user.validator";
import * as userController from "./user.controller";
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
router.put("/edit-user/:userId", userController.updateUserById);
router.delete("/delete-user/:userId", userController.deleteUserbyId);
router.get("/:userId/links", userController.getUserLinksById);

export default router;
